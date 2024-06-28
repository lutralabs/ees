'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

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

const createGraph = (accountData: Map<`0x${string}`, Endorser[]>) => {
  const nodeIds = new Set<`0x${string}`>();
  const nodes = new Array<{
    id: string;
    avatar: HTMLImageElement | null;
    displayName: string | null;
    totalEndorsementsReceived: number;
    text: string;
  }>();

  const links = Array.from(accountData.entries()).flatMap(
    ([account, endorsers]) => {
      return endorsers.flatMap((endorser) => {
        let img: HTMLImageElement | null = null;

        if (endorser.avatar) {
          img = new Image();
          img.src = endorser.avatar;
        }

        if (!nodeIds.has(endorser.address!)) {
          nodeIds.add(endorser.address!);
          nodes.push({
            id: endorser.address as string,
            avatar: img ?? null,
            displayName: endorser.displayName,
            totalEndorsementsReceived: endorser.totalEndorsementsReceived,
            text: `${endorser.address!.slice(0, 7)}...`,
          });
        }

        return endorser.endorsements.map((endorsement) => ({
          source: endorser.address as string,
          target: account as string,
          type: endorsement.endorsementType,
          easUid: endorsement.easUid,
        }));
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
  const graph = createGraph(graphData);
  const img = new Image();

  if (avatar) {
    img.src = avatar;
  }

  graph.nodes.push({
    id: account,
    avatar: avatar ? img : null, // TODO: Pass this down from the parent components
    displayName: displayName,
    totalEndorsementsReceived: totalEndorsementsReceived,
    text: `${account.slice(0, 7)}...`,
  });

  console.log(graph);

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const graphWrapperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="h-[480px] w-full">
      <div id="graph-wrapper" ref={graphWrapperRef} className="h-full w-full">
        <ForceGraph2D
          graphData={graph}
          width={width}
          height={height}
          nodeRelSize={8}
          linkWidth={2}
          d3VelocityDecay={0.2}
          nodeId="id"
          // onNodeClick={(node) => {
          //   console.log(node);
          // }}
          // onNodeHover={(node) => {
          //   console.log(node);
          // }}
          nodeCanvasObject={({ id, avatar, text, x, y }, ctx) => {
            if (!x || !y) return;

            const radius = 8;

            if (avatar) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2, false);

              if (id === account) {
                ctx.strokeStyle = '#ff0000';
                ctx.stroke();
              }

              ctx.clip();
              ctx.drawImage(
                avatar,
                x - radius,
                y - radius,
                radius * 2,
                radius * 2
              );

              ctx.restore();
              return;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = id === account ? '#ff0000' : '#8f8f8f'; // TODO: Se color for primary account
            ctx.fillStyle = '#8f8f8f';
            ctx.fill();
            ctx.stroke();
            ctx.clip();
            ctx.font = '3px Sans-Serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(text, x, y);
            ctx.restore();
          }}
        />
      </div>
       
    </div>
  );
};
