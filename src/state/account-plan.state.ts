import { create } from 'zustand';
import type { AccountPlansResponse } from '~types/account-plan';

type State = {
  filters: {
    page?: number;
    limit?: number;
  }
  loading: boolean;
  response: AccountPlansResponse | null;
}

type Action = {
  setLoading: (loading: boolean) => void;
  setResponse: (response: AccountPlansResponse | null) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useAccountPlanState = create<State & Action>((set) => ({
  loading: false,
  response: null,
  filters: {},
  setLoading: (loading) => set({ loading }),
  setResponse: (response) => set({ response }),
  setPage: (page) => set((state) => ({ filters: { ...state.filters, page } })),
  setLimit: (limit) => set((state) => ({ filters: { ...state.filters, limit } }))
}));