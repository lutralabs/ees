'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExtraInfo } from './ExtraInfo';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formatAddress } from '@/utils';

const ForceGraph2D = dynamic(
  () => import('react-force-graph').then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

type InteractiveSocialGraphProps = {
  graphData: Map<`0x${string}`, Endorser[]>;
  account: `0x${string}`;
  avatar: string | null;
  displayName: string | null;
  totalEndorsementsReceived: number;
};

export type Endorser = {
  displayName: string | null;
  address: `0x${string}` | null;
  description: string | null;
  avatar: string | null;
  totalEndorsementsReceived: number;
  endorsements: { endorsementType: string; easUid: string }[];
};

const createGraph = (
  accountData: Map<`0x${string}`, Endorser[]>,
  currentAccount: `0x${string}`
) => {
  const nodeIds = new Set<`0x${string}`>();
  const nodes = new Array<{
    id: string;
    avatar: HTMLImageElement | null;
    avatarSrc: string | null;
    displayName: string | null;
    totalEndorsementsReceived: number;
    text: string;
  }>();

  // Keep track of the number of links between two accounts
  // Key: `fromAccount-toAccount`
  const linkCurvatures = new Map<string, number>();

  const curvatureDelta = 0.033;

  const links = Array.from(accountData.entries()).flatMap(
    ([account, endorsers]) => {
      return endorsers.flatMap((endorser) => {
        let img: HTMLImageElement | null = null;

        if (endorser.avatar) {
          img = new Image();
          img.src = endorser.avatar;
        }

        if (
          !nodeIds.has(endorser.address!) &&
          endorser.address !== currentAccount
        ) {
          nodeIds.add(endorser.address!);
          nodes.push({
            id: endorser.address as string,
            avatar: img ?? null,
            avatarSrc: endorser.avatar,
            displayName: endorser.displayName,
            totalEndorsementsReceived: endorser.totalEndorsementsReceived,
            text: formatAddress(endorser.address!),
          });
        }

        return endorser.endorsements.map((endorsement) => {
          const linkId = `${endorser.address}-${account}`;
          const linkIdReverse = `${account}-${endorser.address}`;
          let curvature;
          let isReverse = false;

          if (linkCurvatures.has(linkId)) {
            curvature = linkCurvatures.get(linkId)!;
          } else if (linkCurvatures.has(linkIdReverse)) {
            curvature = linkCurvatures.get(linkIdReverse)!;
            isReverse = true;
          } else {
            curvature = 0.0;
          }

          if (curvature > 0.0) {
            curvature = -(curvature + curvatureDelta);
          } else {
            curvature = -(curvature - curvatureDelta);
          }

          linkCurvatures.set(isReverse ? linkIdReverse : linkId, curvature);

          return {
            source: endorser.address as string,
            target: account as string,
            endorsementType: endorsement.endorsementType,
            easUid: endorsement.easUid,
            curvature: isReverse ? -curvature : curvature,
            color:
              endorser.address === currentAccount
                ? '#ff0000'
                : account === currentAccount
                  ? '#90EE90'
                  : '#8f8f8f',
          };
        });
      });
    }
  );

  return {
    nodes: Array.from(nodes),
    links,
  };
};

export const InteractiveSocialGraph = ({
  graphData,
  account,
  avatar,
  displayName,
  totalEndorsementsReceived,
}: InteractiveSocialGraphProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Local state
  const [selectedData, setSelectedData] = useState<null | {
    id: string;
    avatarSrc: string | null;
    address: string;
    displayName: string | null;
    totalEndorsementsReceived: number;
  }>(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  // Hooks
  const graphWrapperRef = useRef<HTMLDivElement>(null);

  const graph = useMemo(() => {
    const data = createGraph(graphData, account);
    const img = new Image();

    if (avatar) {
      img.src = avatar;
    }

    data.nodes.push({
      id: account,
      avatar: avatar ? img : null,
      avatarSrc: avatar,
      displayName: displayName,
      totalEndorsementsReceived: totalEndorsementsReceived,
      text: `${account.slice(0, 7)}...`,
    });

    return data;
  }, [graphData, account]);

  useEffect(() => {
    if (!graphWrapperRef.current) return;
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });

    resizeObserver.observe(graphWrapperRef.current);
  }, []);

  // Functions
  const handleEndorsementSelection = useCallback(
    (id: string, _account: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('endorsementId', id);
      params.set('tab', 'explorer');

      if (account === _account) {
        router.push(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      } else {
        params.set('platform', 'ethereum');
        router.push(`/profile/${_account}?${params.toString()}`, {
          scroll: false,
        });
      }
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="h-[480px] w-full">
      <div id="graph-wrapper" ref={graphWrapperRef} className="h-full w-full">
        <ForceGraph2D
          graphData={graph}
          width={width}
          height={height}
          nodeRelSize={6}
          linkWidth={1.5}
          d3VelocityDecay={0.2}
          nodeId="id"
          linkDirectionalArrowLength={2}
          linkCurvature="curvature"
          onNodeClick={(node) => {
            setSelectedData({
              id: node.id as string,
              avatarSrc: node.avatarSrc,
              address: node.id as string,
              displayName: node.displayName,
              totalEndorsementsReceived: node.totalEndorsementsReceived,
            });
          }}
          onLinkClick={(link) => {
            handleEndorsementSelection(link.easUid, (link.target as any).id);
          }}
          linkLabel={(link) => {
            return link.endorsementType;
          }}
          linkColor="color"
          nodeCanvasObject={({ id, avatar, text, x, y }, ctx) => {
            if (!x || !y) return;

            const radius = 6;

            if (avatar) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2, false);

              if (id === account) {
                ctx.strokeStyle = '#ff0000';
                ctx.stroke();
              }

              ctx.clip();

              if (avatar.width === avatar.height) {
                // Aspect ratio is 1:1 so we can just draw the image
                ctx.drawImage(
                  avatar,
                  x - radius,
                  y - radius,
                  radius * 2,
                  radius * 2
                );
              } else if (avatar.width > avatar.height) {
                // Take center part of the image
                ctx.drawImage(
                  avatar,
                  (avatar.width - avatar.height) / 2,
                  0,
                  avatar.height,
                  avatar.height,
                  x - radius,
                  y - radius,
                  radius * 2,
                  radius * 2
                );
              } else {
                // Take center part of the image
                ctx.drawImage(
                  avatar,
                  0,
                  (avatar.height - avatar.width) / 2,
                  avatar.width,
                  avatar.width,
                  x - radius,
                  y - radius,
                  radius * 2,
                  radius * 2
                );
              }

              ctx.restore();
              return;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = id === account ? '#ff0000' : '#8f8f8f';
            ctx.fillStyle = '#8f8f8f';
            ctx.fill();
            ctx.stroke();
            ctx.clip();
            ctx.font = '1.75px Sans-Serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(text, x, y);
            ctx.restore();
          }}
        />
      </div>

      <ExtraInfo
        isOpen={selectedData !== null}
        close={() => setSelectedData(null)}
        data={selectedData!}
      />
    </div>
  );
};
