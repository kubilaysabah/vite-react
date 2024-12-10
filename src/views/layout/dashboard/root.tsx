import { Outlet, useNavigation } from 'react-router-dom';
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import Header from '@components/dashboard/header';
import Loading from '@components/dashboard/loading';
import { dashboardThemes } from '@/theme';
import Alert from '@components/shared/alert';
import { useDashboardThemeState, THEME_MODE } from '@state/theme.state';

export default function MainLayout() {
  const { state } = useNavigation();
  const mode = useDashboardThemeState((state) => state.mode);

  return (
    <ThemeProvider theme={mode === THEME_MODE.DARK ? dashboardThemes.dark : dashboardThemes.light}>
      <GlobalStyles
        styles={{
          '@keyframes animate': {
            '0%, 100%': {
              clipPath: 'polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)'
            },
            '50%': {
              clipPath: 'polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)'
            }
          }
        }}
      />
      <Alert />
      <CssBaseline />
      <Box>
        <Header />

        <Box sx={{ height: '100vh', padding: 2 }}>
          <Loading loading={state === 'loading'} />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
