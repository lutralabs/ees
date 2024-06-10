import type { PlatformType } from '@/utils/platform';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface EndorsementStore {
  // Endorsee information
  address: `0x${string}` | null;
  platform: PlatformType | null;
  displayValue: string | null; // Value of profile display (e.g. stani.lens)

  // Endorsement information
  endorsementType: string; // Type of endorsement
  donationValue: string; // Donation amount
  comment: string;

  changeAddress: (address: `0x${string}` | null) => void;
  changePlatform: (platform: PlatformType | null) => void;
  changeDisplayValue: (displayValue: string | null) => void;
  changeEndorsementType: (endorsementType: string) => void;
  changeDonationValue: (donationValue: string) => void;
  changeComment: (comment: string) => void;

  // Clear
  clear: () => void;
  partialClear: () => void;
}

export const endorsementStoreInitialState = {
  address: null,
  platform: null,
  displayValue: null,
  endorsementType: 'Based energy 🔵',
  donationValue: '',
  comment: '',
};

export const useEndorsementStore = createWithEqualityFn<EndorsementStore>()(
  (set) => ({
    ...endorsementStoreInitialState,

    changeAddress: (address: `0x${string}` | null) => set({ address }),
    changePlatform: (platform: PlatformType | null) => set({ platform }),
    changeDisplayValue: (displayValue: string | null) => set({ displayValue }),
    changeEndorsementType: (endorsementType: string) =>
      set({ endorsementType }),
    changeDonationValue: (donationValue: string) => set({ donationValue }),
    changeComment: (comment: string) => set({ comment }),

    // Clear
    clear: () => set(endorsementStoreInitialState),
    partialClear: () =>
      set({
        donationValue: '',
        comment: '',
      }),
  }),
  shallow
);
