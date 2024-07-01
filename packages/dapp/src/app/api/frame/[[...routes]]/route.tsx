/** @jsxImportSource frog/jsx */

import { blo } from 'blo';
import {
  Button,
  Frog,
  TextInput,
  type TransactionParameters,
  parseEther,
} from 'frog';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Image,
  Spacer,
  vars,
} from '@/utils/frogUi';
import { devtools } from 'frog/dev';
import { pinata } from 'frog/hubs';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { EESCore } from '@/lib/contracts/abis';
import { validateOrGetDefaultPlatform, APP_URL } from '@/utils';
import { getMinimalProfileInfoByPlatform } from '@/lib/airstack';

const ENDORSEMENT_OPTIONS = [
  { value: 'Based energy', label: 'Based energy 🔵' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Hacker', label: 'Hacker' },
  { value: 'Buidler', label: 'Buidler' },
  { value: 'Memer', label: 'Memer' },
  { value: 'Degen', label: 'Degen' },
  { value: 'Web3 explorer', label: 'Web3 explorer' },
  { value: 'Friend', label: 'Friend' },
  { value: 'Artist', label: 'Artist' },
  { value: 'Blogger', label: 'Blogger' },
  { value: 'Trader', label: 'Trader' },
];

const options_length = ENDORSEMENT_OPTIONS.length;

const client = createPublicClient({
  chain: base,
  transport: http(process.env.RPC_PROVIDER_URL!), // Curently Sepolia
});

const endorsement_fee = '0.00042';

type State = {
  user: {
    username: string;
    avatar: string;
    address: string;
  };
  type: number;
  tip?: number;
  comment?: string;
};

const app = new Frog<{ State: State }>({
  title: 'endorse.fun',
  basePath: '/api/frame',
  ui: { vars },
  // Supply a Hub to enable frame verification.
  hub: pinata(),
  // hub: { apiUrl: process.env.HUB_URL! },
  verify: 'silent',
  secret: process.env.FROG_SECRET,
  initialState: {
    user: {
      username: '',
      avatar: '',
      address: '',
    },
    type: 0,
    tip: undefined,
    comment: undefined,
  },
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge';

app.frame('/', (c) => {
  return c.res({
    image: `${APP_URL}/frame/intro.png`,
    intents: [
      <Button action="/main">Start</Button>,
      <Button action="/info">Legend</Button>,
      <Button.Redirect location="https://endorse.fun">
        endorse.fun
      </Button.Redirect>,
    ],
  });
});

const verifyLogin = () => {
  return {
    image: (
      <Box grow alignVertical="center" backgroundColor="white" padding="32">
        <VStack gap="4">
          <Heading>endorse.fun</Heading>
          <Divider />
          <Text color="secondary" size="20">
            Invalid User
          </Text>
          <Text color="secondary">Please login to your Farcaster account</Text>
        </VStack>
      </Box>
    ),
    intents: [<Button.Reset>Try Again</Button.Reset>],
  };
};

app.frame('/main', (c) => {
  const { verified } = c;

  if (!verified) return c.res(verifyLogin());

  return c.res({
    image: `${APP_URL}/frame/endorse_frame.png`,
    intents: [
      <TextInput placeholder="Search by farcaster, ens, lens" />,
      <Button value="search" action="/search">
        Search🔎
      </Button>,
      <Button.Reset>Reset🔄</Button.Reset>,
      <Button.Redirect location="https://endorse.fun">
        endorse.fun
      </Button.Redirect>,
    ],
  });
});

app.frame('/info', (c) => {
  return c.res({
    image: `${APP_URL}/frame/legend_frame.png`,
    intents: [
      <Button action="/main">Start</Button>,
      <Button.Reset>Back ↩️</Button.Reset>,
      <Button.Redirect location="https://endorse.fun">
        endorse.fun
      </Button.Redirect>,
    ],
  });
});

app.frame('/search', async (c) => {
  const { frameData, verified, deriveState } = c;
  const { inputText } = frameData || {};

  if (!verified) return c.res(verifyLogin());

  if (!inputText) {
    return c.res({
      image: `${APP_URL}/frame/endorse_frame.png`,
      intents: [
        <TextInput placeholder="Search by farcaster, ens, lens" />,
        <Button value="search" action="/search">
          Search🔎
        </Button>,
        <Button.Reset>Reset🔄</Button.Reset>,
        <Button.Redirect location="https://endorse.fun">
          endorse.fun
        </Button.Redirect>,
      ],
    });
  }

  let platform;
  if (inputText.endsWith('.eth')) {
    platform = 'ens';
  } else if (inputText.endsWith('.lens')) {
    platform = 'lens';
  } else {
    platform = 'farcaster';
  }

  const _platform = validateOrGetDefaultPlatform(platform);

  const userData = await getMinimalProfileInfoByPlatform(_platform, inputText);

  if (!userData.address) {
    return c.res({
      image: (
        <Box
          grow
          backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
          height="100%"
          padding="32"
        >
          {/* @ts-ignore */}
          <VStack maxWidth="767">
            <Text color="secondary" size="32">
              User {inputText} not found
            </Text>
            <Text color="secondary" size="28">
              Try searching with a different username
            </Text>
          </VStack>
        </Box>
      ),
      intents: [
        <TextInput placeholder="Search by farcaster, ens, lens" />,
        <Button value="search" action="/search">
          Search🔎
        </Button>,
        <Button.Reset>Reset🔄</Button.Reset>,
        <Button.Redirect location="https://endorse.fun">
          endorse.fun
        </Button.Redirect>,
      ],
    });
  }

  // If no avatar is available use address to generate one
  if (!userData.avatar && userData.address) {
    userData.avatar = blo(userData.address, 128);
  }

  const state = deriveState((previousState) => {
    if (userData.displayName)
      previousState.user.username = userData.displayName;
    if (userData.avatar) previousState.user.avatar = userData.avatar;
    if (userData.address) previousState.user.address = userData.address;
  });

  return c.res({
    image: (
      <Box
        grow
        backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
        height="100%"
      >
        <HStack>
          <Box marginLeft="32" marginTop="32" height="100%" width="128">
            <Image
              width="128"
              height="128"
              borderRadius="64"
              src={state.user.avatar}
            />
          </Box>
          <Box padding="32">
            {/* @ts-ignore */}
            <VStack maxWidth="767">
              <Text color="secondary" size="32">
                Endorsing
              </Text>
              <Text color="primary" size="32">
                {state.user.username.length > 18
                  ? `${state.user.username.slice(0, 16)}...`
                  : state.user.username}
              </Text>
              <Text color="secondary" size="28">
                Confirm User
              </Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Search by farcaster, ens, lens" />,
      <Button action="/type-selection">✅</Button>,
      <Button value="search">Search🔎</Button>,
      <Button.Reset>🔄</Button.Reset>,
      <Button.Redirect location="https://endorse.fun">
        endorse.fun
      </Button.Redirect>,
    ],
  });
});

app.frame('/type-selection', (c) => {
  const { buttonValue, verified, deriveState } = c;

  if (!verified) return c.res(verifyLogin());

  const state = deriveState((previousState) => {
    if (buttonValue === 'inc') {
      previousState.type = (previousState.type + 1) % options_length;
    }
    if (buttonValue === 'dec') {
      previousState.type =
        (((previousState.type - 1) % options_length) + options_length) %
        options_length;
    }
  });

  // Type selection
  return c.res({
    image: (
      <Box
        grow
        backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
        height="100%"
      >
        <HStack grow>
          <Box marginLeft="32" marginTop="32" height="100%" width="128">
            <Image
              width="128"
              height="128"
              borderRadius="64"
              src={state.user.avatar}
            />
          </Box>
          <Box grow alignVertical="top" margin="32" height="100%">
            {/* @ts-ignore */}
            <VStack maxWidth="767">
              <Text color="secondary" size="32">
                Endorsing
              </Text>
              <Text color="primary" size="32">
                {state.user.username.length > 18
                  ? `${state.user.username.slice(0, 16)}...`
                  : state.user.username}
              </Text>
              <Text color="secondary" size="28">
                {ENDORSEMENT_OPTIONS[state.type].value === 'Based energy'
                  ? 'for'
                  : 'as a'}
              </Text>
              <Text color="primary" size="32">
                {ENDORSEMENT_OPTIONS[state.type].label}
              </Text>
              <Spacer size="20" />
              <Text color="secondary" size="16" wrap>
                Select endorsement types
              </Text>
              <Text color="secondary" size="16" wrap>
                {'by pressing < and > arrows'}
              </Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    ),
    intents: [
      <Button value="confirm" action="/form">
        ✅
      </Button>,
      <Button value="dec">⬅️</Button>,
      <Button value="inc">➡️</Button>,
      <Button.Reset>🔄</Button.Reset>,
    ],
  });
});

app.frame('/form', (c) => {
  const { buttonValue, verified, frameData, deriveState } = c;
  const { inputText } = frameData || {};

  if (!verified) return c.res(verifyLogin());

  let tip = undefined;

  if (buttonValue === 'confirm-tip' && inputText) {
    tip = Number.parseFloat(inputText);
    Number.isNaN(tip) ? undefined : tip;
  }

  const state = deriveState((previousState) => {
    if (buttonValue === 'confirm-tip' && tip) {
      previousState.tip = tip;
    }
    if (buttonValue === 'confirm-comment' && inputText) {
      previousState.comment = inputText;
    }
  });

  if (buttonValue) {
    switch (buttonValue) {
      case 'confirm-tip':
      case 'tip':
        if (!tip)
          return c.res({
            image: (
              <Box
                grow
                backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
                height="100%"
              >
                <HStack grow>
                  <Box marginLeft="32" marginTop="32" height="100%" width="128">
                    <Image
                      width="128"
                      height="128"
                      borderRadius="64"
                      src={state.user.avatar}
                    />
                  </Box>
                  <Box grow alignVertical="top" margin="32" height="100%">
                    {/* @ts-ignore */}
                    <VStack maxWidth="767">
                      <Text color="secondary" size="32">
                        Endorsing
                      </Text>
                      <Text color="primary" size="32">
                        {state.user.username.length > 18
                          ? `${state.user.username.slice(0, 16)}...`
                          : state.user.username}
                      </Text>
                      <Text color="secondary" size="28">
                        Add a tip to the endorsement
                      </Text>
                      <Text color="secondary" size="16" wrap>
                        Enter the number amount in ETH
                      </Text>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            ),
            intents: [
              <TextInput placeholder="Enter tip amount in ETH" />,
              <Button value="confirm-tip">Confirm✅</Button>,
              <Button value="back">Back ↩️</Button>,
            ],
          });
        break;
      case 'comment':
        return c.res({
          image: (
            <Box
              grow
              backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
              height="100%"
            >
              <HStack grow>
                <Box marginLeft="32" marginTop="32" height="100%" width="128">
                  <Image
                    width="128"
                    height="128"
                    borderRadius="64"
                    src={state.user.avatar}
                  />
                </Box>
                <Box grow alignVertical="top" margin="32" height="100%">
                  {/* @ts-ignore */}
                  <VStack maxWidth="767">
                    <Text color="secondary" size="32">
                      Endorsing
                    </Text>
                    <Text color="primary" size="32">
                      {state.user.username.length > 18
                        ? `${state.user.username.slice(0, 16)}...`
                        : state.user.username}
                    </Text>
                    <Spacer size="4" />
                    <Text color="secondary" size="32">
                      Add a comment
                    </Text>
                    <Text color="secondary" size="24">
                      * Comments are public and visible to everyone
                    </Text>
                  </VStack>
                </Box>
              </HStack>
            </Box>
          ),
          intents: [
            <TextInput placeholder="Enter comment" />,
            <Button value="confirm-comment">Confirm✅</Button>,
            <Button value="back">Back ↩️</Button>,
          ],
        });
    }
  }

  return c.res({
    image: (
      <Box
        grow
        backgroundImage={`url("${APP_URL}/frame/frame_bg1.png")`}
        height="100%"
      >
        <HStack grow>
          <Box marginLeft="32" marginTop="32" height="100%" width="128">
            <Image
              width="128"
              height="128"
              borderRadius="64"
              src={state.user.avatar}
            />
          </Box>
          <Box grow alignVertical="top" margin="32" height="100%">
            {/* @ts-ignore */}
            <VStack maxWidth="767">
              <Text color="secondary" size="32">
                Endorsing
              </Text>
              <Text color="primary" size="32">
                {state.user.username.length > 18
                  ? `${state.user.username.slice(0, 16)}...`
                  : state.user.username}
              </Text>
              <Text color="secondary" size="28">
                {/* Keep 'for' when 'Based Energy' is selected */}
                {state.type === 0 ? 'for ' : 'as a '}
                {ENDORSEMENT_OPTIONS[state.type].label}
              </Text>
              {state.tip && (
                <Text color="primary" size="20">
                  Tip: {state.tip} ETH
                </Text>
              )}
              {state.comment && (
                <Text color="primary" size="20">
                  Comment: {state.comment}
                </Text>
              )}
              <Spacer size="20" />
              <Text color="secondary" size="28" wrap>
                Confirm Endorsement
              </Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    ),
    intents: [
      <Button.Transaction action="/finish" target="/endorsement">
        Endorse
      </Button.Transaction>,
      <Button value="comment">Add💬</Button>,
      <Button value="tip">Add💰</Button>,
      <Button.Reset>🔄</Button.Reset>,
    ],
  });
});

app.frame('/finish', async (c) => {
  const { transactionId, previousState, verified } = c;

  if (!verified) return c.res(verifyLogin());

  let receipt = undefined;
  try {
    receipt = await client.getTransactionReceipt({
      hash: transactionId!,
    });
  } catch (error) {
    // Transaction is not yet complete, reload frame
    return c.res({
      image: (
        <Box
          grow
          padding="32"
          backgroundImage={`url("${APP_URL}/frame/frame_bg2.png")`}
          height="100%"
        >
          <VStack gap="4" width="100%">
            <Text color="primary" size="48">
              Transaction pending
            </Text>
            <Text color="secondary" size="32">
              Refresh the frame in a few seconds to check the status
            </Text>
          </VStack>
        </Box>
      ),
      intents: [<Button value="refresh">Refresh</Button>],
    });
  }

  switch (receipt.status) {
    // Transaction succeeded, show confirmation and basescan url
    case 'success':
      return c.res({
        image: (
          <Box
            grow
            padding="32"
            backgroundImage={`url("${APP_URL}/frame/frame_bg2.png")`}
            height="100%"
          >
            <VStack gap="4" width="100%">
              <Text color="secondary" size="32">
                Successfully endorsed
              </Text>
              <Text color="primary" size="48">
                {previousState.user.username.length > 18
                  ? `${previousState.user.username.slice(0, 16)}...`
                  : previousState.user.username}
              </Text>
              <Text color="secondary" size="32">
                View transaction on BaseScan
              </Text>
            </VStack>
          </Box>
        ),
        intents: [
          <Button.Redirect
            location={`${process.env.BASESCAN_URL}${transactionId}`}
          >
            View on BaseScan
          </Button.Redirect>,
        ],
      });
    // Transaction reverted, show error and frame reset button
    case 'reverted':
      return c.res({
        image: (
          <Box
            grow
            padding="32"
            backgroundImage={`url("${APP_URL}/frame/frame_bg2.png")`}
            height="100%"
          >
            <VStack gap="4" width="100%">
              <Text color="primary" size="48">
                Transaction reverted
              </Text>
              <Text color="secondary" size="32">
                View transaction on BaseScan or reset the frame
              </Text>
            </VStack>
          </Box>
        ),
        intents: [
          <Button.Redirect
            location={`${process.env.BASESCAN_URL}${transactionId}`}
          >
            View on BaseScan
          </Button.Redirect>,
          <Button action="/form">Try Again</Button>,
          <Button.Reset>🔄</Button.Reset>,
        ],
      });
  }
});

app.transaction('/endorsement', async (c) => {
  const { previousState } = c;

  return c.contract({
    abi: EESCore,
    chainId: process.env.CHAIN_ID! as TransactionParameters['chainId'],
    functionName: 'endorse',
    args: [
      previousState.user.address as `0x${string}`,
      ENDORSEMENT_OPTIONS[previousState.type ?? 0].label,
      previousState.comment ?? '',
      previousState.user.username ?? '',
    ],
    to: process.env.EES_CONTRACT_ADDRESS as `0x${string}`,
    // If tip is available, add it to the transaction, otherwise just pay the endorsement fee
    value: previousState.tip
      ? parseEther(previousState.tip.toString()) + parseEther(endorsement_fee)
      : parseEther(endorsement_fee),
  });
});

if (process.env.NEXT_PUBLIC_APP_ENV === 'development')
  devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
