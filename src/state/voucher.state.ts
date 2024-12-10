import { create } from 'zustand';
import type { VouchersResponse } from '~types/voucher';

type Filter = {
  page?: number;
  limit?: number;
}

type State = {
  loading: boolean;
  response: VouchersResponse | null;
  filters: Filter;
}

type Action = {
  setLoading: (loading: boolean) => void;
  setResponse: (response: VouchersResponse) => void;
  setFilters: (filters: Filter) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useVoucherState = create<State & Action>((set) => ({
  loading: false,
  response: null,
  filters: {},
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setResponse: (response) => set({ response }),
  setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
  setLimit: (limit) => set((state) => ({ filters: { ...state.filters, limit } })),
}))