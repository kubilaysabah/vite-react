import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type Package = {
  name: string;
  price: number;
  credit: number;
};

type State = {
  package: null | Package;
}

type Action = {
  selectPackage: (selectedPackage: Package | null) => void;
}

export const useCartState = create<State & Action>()(
  persist(
    (set) => ({
      company_name: null,
      address: null,
      tax_number_or_turkish_identity_number: null,
      package: null,
      selectPackage: (selectedPackage: Package | null) => set({ package: selectedPackage }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)