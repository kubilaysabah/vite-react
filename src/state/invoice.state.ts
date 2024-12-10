import { create } from 'zustand';
import type { InvoicesResponse } from '~types/invoice';

type Filters = {
  integratorId?: string;
  taxPayerId?: string;
  date: {
    start: string | null;
    end: string | null;
  };
  page?: number;
  limit?: number;
  type?: number;
}

type State = {
  loading: boolean;
  response: InvoicesResponse | null,
  filters: Filters
}

type Action = {
  setResponse: (response: InvoicesResponse | null) => void,
  setDate: (key: 'start' | 'end', value: string | null) => void,
  setTaxPayerId: (taxPayerId: string) => void,
  setIntegratorId: (integratorId: string) => void,
  clearFilters: () => void
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  setLoading: (loading: boolean) => void
  changeInvoiceType: (type: number) => void
}

const initialFilters = {
  date: {
    start: null,
    end: null,
  },
  page: 1,
  limit: 15,
  type: 1,
}

export const useInvoiceState = create<State & Action>((set) => ({
  loading: false,
  response: null,
  filters: initialFilters,
  setResponse: (response) => set({ response }),
  setDate: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      date: {
        ...state.filters.date,
        [key]: value
      }
    }
  })),
  setTaxPayerId: (taxPayerId) => set((state) => ({
    filters: {
      ...state.filters,
      taxPayerId
    }
  })),
  setIntegratorId: (integratorId) => set((state) => ({
    filters: {
      ...state.filters,
      integratorId
    }
  })),
  clearFilters: () => set({ filters: initialFilters }),
  setPage: (page) => set((state) => ({
    filters: {
      ...state.filters,
      page
    }
  })),
  setLimit: (limit) => set((state) => ({
    filters: {
      ...state.filters,
      limit
    }
  })),
  setLoading: (loading) => set({ loading }),
  changeInvoiceType: (type) => set((state) => ({ filters: { ...state.filters, type } }))
}));