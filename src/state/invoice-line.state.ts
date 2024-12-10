import { create } from 'zustand';
import type { InvoiceLinesResponse } from '~types/invoice-line.ts';

type Filters = {
  invoiceId?: string,
  page?: number;
  limit?: number;
}

type State = {
  loading: boolean;
  response: InvoiceLinesResponse | null,
  filters: Filters
}

type Action = {
  setResponse: (response: InvoiceLinesResponse | null) => void,
  setInvoiceId: (invoiceId: string) => void,
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  setLoading: (loading: boolean) => void,
  clearFilters: () => void,
}

const initialFilters = {
  page: 1,
  limit: 15,
}

export const useInvoiceLineState = create<State & Action>((set) => ({
  loading: false,
  response: null,
  filters: initialFilters,
  setResponse: (response) => set({ response }),
  setInvoiceId: (invoiceId: string) => set((state) => ({
    filters: {
      ...state.filters,
      invoiceId
    }
  })),
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
  clearFilters: () => set({ filters: initialFilters }),
}));