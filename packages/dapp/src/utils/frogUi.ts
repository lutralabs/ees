import { createSystem } from 'frog/ui';

export const {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Image,
  Spacer,
  vars,
} = createSystem({
  colors: {
    primary: '#008DDA',
    secondary: '#0B315C',
    white: '#FFFFFF',
  },
  fonts: {
    default: [
      {
        name: 'Inter',
        source: 'google',
        weight: 500,
      },
    ],
  },
  fontSizes: {
    '12': 12,
    '14': 14,
    '16': 16,
    '18': 18,
    '20': 20,
    '24': 24,
    '28': 28,
    '32': 32,
    '36': 36,
    '40': 40,
    '44': 44,
    '48': 48,
    '52': 52,
    '56': 56,
    '60': 60,
    '64': 64,
  },
});
