import { type FormikHandlers } from 'formik';
import { Grid2 as Grid, TextField, LinearProgress } from '@mui/material';
import type { TaxPayer } from '~types/tax-payer.ts';

type Props = {
    values?: TaxPayer | null;
    isPending?: boolean;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
}

export default function General({ values = null, isPending = false, handleChange, handleBlur }: Props) {
    return (
      <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <TextField
                disabled={isPending}
                id={'firstname'}
                fullWidth
                focused
                label="Adı"
                variant="outlined"
                placeholder="Adınızı girin"
                name={'firstname'}
                value={values?.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPending && <LinearProgress />}
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <TextField
                disabled={isPending}
                id={'lastname'}
                fullWidth
                focused
                label="Soyadı / Ünvanı"
                variant="outlined"
                placeholder="Soyadı / Ünvanı girin"
                value={values?.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPending && <LinearProgress />}
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <TextField
                disabled={isPending}
                focused
                id={'phone'}
                fullWidth
                label="Telefon Numarası"
                variant="outlined"
                placeholder="Telefon numaranızı girin"
                type="tel"
                name={'phone'}
                value={values?.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPending && <LinearProgress />}
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <TextField
                disabled={isPending}
                id={'email'}
                type={'email'}
                fullWidth
                focused
                label="E-Posta Adresi"
                variant="outlined"
                placeholder="E-posta adresinizi girin"
                name={'email'}
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPending && <LinearProgress />}
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
              <TextField
                disabled={isPending}
                id={'turkish_identity_number'}
                fullWidth
                focused
                label="TC Kimlik Numarası"
                variant="outlined"
                placeholder="TC kimlik numarası girin"
                name={'turkish_identity_number'}
                value={values?.turkish_identity_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPending && <LinearProgress />}
          </Grid>
      </Grid>
    );
}
