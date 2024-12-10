import { create } from 'zustand';
import type { ActivitiesResponse } from '~types/utils';

type State = {
  filters: {
    page?: number;
    limit?: number;
  };
  loading: boolean;
  response: ActivitiesResponse | null;
}

type Action = {
  setLoading: (loading: boolean) => void;
  setResponse: (response: ActivitiesResponse | null) => void;
}

export const useActivity = create<State & Action>((set) => ({
  filters: {},
  loading: false,
  response: null,
  setLoading: (loading) => set({ loading }),
  setResponse: (response) => set({ response })
}))