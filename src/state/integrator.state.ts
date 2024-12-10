import { create } from 'zustand';
import type { IntegratorsResponse } from '~types/integrator';

type Filter = {
  page?: number;
  limit?: number;
}

type State = {
  filters: Filter;
  loading: boolean;
  response: IntegratorsResponse | null;
}

type Action = {
  setLoading: (loading: boolean) => void;
  setResponse: (response: IntegratorsResponse | null) => void;
  setFilters: (filters: Filter) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useIntegratorState = create<State & Action>((set) => ({
  loading: false,
  response: null,
  filters: {},
  setLoading: (loading) => set({ loading }),
  setResponse: (response) => set({ response }),
  setFilters: (filters) => set({ filters }),
  setPage: (page) => set((state) => ({
    filters: {
      ...state?.filters,
      page
    }
  })),
  setLimit: (limit) => set((state) => ({
    filters: {
      ...state?.filters,
      limit
    }
  })),
}))