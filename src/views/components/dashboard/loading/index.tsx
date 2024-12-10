import { Box, Typography, useTheme } from '@mui/material';

export default function Loading({ loading = false }: { loading?: boolean; }) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box component={'section'} sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        display: 'flex',
        background: theme.palette.background.default,
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box className={'content'} sx={{ position: 'relative' }}>
          <Typography
            component={'h2'}
            sx={{
              color: 'transparent',
              WebkitTextStroke: `2px ${theme.palette.primary.dark}`,
              fontSize: '8em',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {'Invosan'}
          </Typography>
          <Typography
            component={'h2'}
            sx={{
              color: theme.palette.primary.main,
              fontSize: '8em',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              animation: 'animate 2s ease-in-out infinite',
            }}
          >
            {'Invosan'}
          </Typography>
        </Box>
      </Box>
    )
  }
}