import { Outlet, Link } from 'react-router-dom';
import { Box, Button, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import Logo from '@assets/images/logo.svg';
import pageRoutes from '@constant/page-routes';

export default function AuthenticationLayout() {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff, #f4f6f8)'
      }}
    >
      <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3, }} sx={{
        background: theme.palette.common.white,
        padding: 3,
        borderRadius: 4,
      }}>
        <Box>
          <Button fullWidth component={Link} to={pageRoutes.home}>
            <Box component={'img'} src={Logo} width={62} height={62} sx={{ objectFit: 'contain' }} />
          </Button>
          <Typography variant={'h1'} sx={{ fontSize: 32, fontWeight: 600, marginBottom: 2, textAlign: 'center', color: theme.palette.text.primary }}>{'Hoş Geldiniz'}</Typography>
          <Typography variant={'body1'} sx={{ textAlign: 'center', marginBottom: 2, color: theme.palette.text.primary }}>{'Bilgilerinizi girerek giriş yapabilirsiniz'}</Typography>
        </Box>
        <Outlet />
      </Grid>
    </Grid>
  )
}