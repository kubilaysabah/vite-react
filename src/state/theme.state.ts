import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum THEME_MODE {
  DARK = 'dark',
  LIGHT = 'light'
}

export type ThemeMode = THEME_MODE.DARK | THEME_MODE.LIGHT

export type State = {
  mode: ThemeMode
}

export type Action = {
  changeTheme: (type: ThemeMode) => void;
}

export const useDashboardThemeState = create<State & Action>()(
  persist(
    (set) => ({
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_MODE.DARK : THEME_MODE.LIGHT,
      changeTheme: (type: ThemeMode) => set({ mode: type }),
    }),
    {
      name: 'dashboard-theme',
      storage: createJSONStorage(() => localStorage),
    }
  ),
)

export const useLandingThemeState = create<State & Action>()(
  persist(
    (set) => ({
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_MODE.DARK : THEME_MODE.LIGHT,
      changeTheme: (type: ThemeMode) => set({ mode: type }),
    }),
    {
      name: 'landing-theme',
      storage: createJSONStorage(() => localStorage),
    }
  ),
)