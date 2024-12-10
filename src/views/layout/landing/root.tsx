import { Outlet, useNavigation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { useDashboardThemeState, THEME_MODE } from '@state/theme.state';
import { landingThemes } from '@/theme';
import Alert from '@components/shared/alert';
import Loading from '@components/dashboard/loading';

export default function LandingLayout() {
    const { state } = useNavigation();
    const mode = useDashboardThemeState((state) => state.mode);

    return (
      <ThemeProvider theme={mode === THEME_MODE.DARK ? landingThemes.dark : landingThemes.light}>
        <Alert />
        <CssBaseline />
        <Loading loading={state === 'loading'} />
        <Box>
          <Outlet />
        </Box>
      </ThemeProvider>
    );
}
