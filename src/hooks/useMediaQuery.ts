import { Breakpoint, useTheme } from '@mui/material';

export function useMediaMin(breakpoint:Breakpoint): string {
  const theme = useTheme();
  return theme.breakpoints.up(breakpoint);
}

export function useMediaMax(breakpoint:Breakpoint): string {
  const theme = useTheme();
  return theme.breakpoints.down(breakpoint);
}