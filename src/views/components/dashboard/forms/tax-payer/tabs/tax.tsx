import dayjs from 'dayjs';
import { type FormikHandlers } from 'formik';
import { FormControlLabel, FormGroup, Grid2 as Grid, LinearProgress, Switch, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { TaxPayer } from '~types/tax-payer';

type Props = {
  values?: TaxPayer | null;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  isPending?: boolean;
}

export default function Tax({ isPending, values, handleBlur, handleChange }: Props) {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                disabled={isPending}
                name={'tax_obligation'}
                id={'tax_obligation'}
                checked={values?.tax_obligation}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            label="Vergi Mükellefiyeti"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          disabled={isPending}
          fullWidth
          focused
          label="Vergi Dairesi"
          variant="outlined"
          placeholder="Vergi Dairesi"
          id={'tax_office'}
          name={'tax_office'}
          value={values?.tax_office}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          disabled={isPending}
          fullWidth
          focused
          label="Vergi Numarası"
          variant="outlined"
          placeholder="Vergi Numarası"
          id={'tax_number'}
          name={'tax_number'}
          value={values?.tax_number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          disabled={isPending}
          fullWidth
          focused
          label="Vergi Dairesi Kodu"
          variant="outlined"
          placeholder="Vergi Dairesi Kodu"
          id={'tax_office_code'}
          name={'tax_office_code'}
          value={values?.tax_office_code}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          fullWidth
          id={'central_registry_system_number'}
          label="MERSİS Numarası"
          variant="outlined"
          placeholder="Mersis numarası girin"
          type="text"
          value={values?.central_registry_system_number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <DatePicker
          label="Kuruluş Tarihi"
          sx={{
            width: '100%'
          }}
          value={dayjs(values?.opening_date)}
          onChange={value => handleChange(value?.toISOString())}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <DatePicker
          label="Kapanış Tarihi"
          value={dayjs(values?.closing_date)}
          onChange={value => handleChange(value?.toISOString())}
          sx={{
            width: '100%'
          }}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <DatePicker
          label="Tescil Tarihi"
          value={dayjs(values?.registration_date)}
          onChange={value => handleChange(value?.toISOString())}
          sx={{
            width: '100%'
          }}
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'registration_place'}
          fullWidth
          label="Tescil Kuruluş Yeri"
          variant="outlined"
          placeholder="Tescil kuruluş yerini girin"
          type="text"
          value={values?.registration_place}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>
    </Grid>
  )
}