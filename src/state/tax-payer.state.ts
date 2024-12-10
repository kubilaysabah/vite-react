import { create } from 'zustand';
import type { TaxPayersResponse } from '~types/tax-payer';

type State = {
  filters: {
    integratorId?: string;
    page?: number;
    limit?: number;
  }
  response: TaxPayersResponse | null;
  loading: boolean;
}

type Action = {
  setResponse: (response: TaxPayersResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setIntegratorId: (integratorId: string) => void;
}

export const useTaxPayerState = create<State & Action>((set) => ({
  filters: {},
  response: null,
  loading: false,
  setResponse: (response) => set({ response }),
  setLoading: (loading) => set({ loading }),
  setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
  setLimit: (limit) => set((state) => ({ filters: { ...state.filters, limit } })),
  setIntegratorId: (integratorId) => set((state) => ({ filters: { ...state.filters, integratorId } })),
}));