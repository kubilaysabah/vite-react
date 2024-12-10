import { Box, InputAdornment, TextField } from '@mui/material';
import { useCartState } from '@state/cart.state.ts';

export default function SelectedPackage() {
  const selectedPackage = useCartState((state) => state.package);

  return (
    <Box>
      <TextField
        focused
        fullWidth
        disabled
        value={selectedPackage?.name}
        id={'name'}
        name={'name'}
        label={'Seçilen Paket'}
        placeholder={'Seçilen Paket'}
        sx={{
          marginBottom: 2
        }}
      />

      <TextField
        focused
        fullWidth
        disabled
        value={selectedPackage?.credit}
        id={'credit'}
        name={'credit'}
        label={'Yüklenecek Kontör'}
        placeholder={'Yüklenecek Kontör'}
        sx={{
          marginBottom: 2
        }}
      />

      <TextField
        focused
        fullWidth
        disabled
        value={selectedPackage?.price}
        id={'price'}
        name={'price'}
        label={'Fiyat'}
        placeholder={'Fiyat'}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">{'₺'}</InputAdornment>
          }
        }}
        sx={{
          marginBottom: 2
        }}
      />
    </Box>
  )
}