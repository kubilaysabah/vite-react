import { Link, useNavigation } from 'react-router-dom';
import { Button, Grid2 as Grid, Box, LinearProgress, useTheme } from '@mui/material';
import ThemeSwitcher from '@components/shared/theme-switcher';
import Logo from '@assets/images/logo.svg';
import pageRoutes from '@constant/page-routes.ts';
import menu from './menu';
import Logout from './logout.tsx';

export default function Header() {
  const theme = useTheme();
  const { state } = useNavigation();

    return (
      <Box component={'header'} sx={{
        background: theme.palette.background.paper,
        marginBottom: 2,
      }}>
        <Grid container alignItems={'center'} paddingX={2}>
          <Grid>
            <Button component={Link} to={pageRoutes.dashboard}>
              <Box
                component={'img'}
                src={Logo}
                alt="Invosan"
                width={60}
                height={60}
                sx={{
                  objectFit: 'contain'
                }}
              />
            </Button>
          </Grid>
          <Grid size={'grow'}>
            <Grid container component={'nav'} spacing={3}>
              {menu.map((item) => (
                <Grid key={item.id}>
                  <Button
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                    key={item.id}
                    to={item.url}
                    component={Link}
                    startIcon={item.icon}>
                      {item.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid>
            <ThemeSwitcher />
          </Grid>
          <Grid>
            <Logout />
          </Grid>
        </Grid>
        {state === 'loading' && <LinearProgress />}
      </Box>
    );
}