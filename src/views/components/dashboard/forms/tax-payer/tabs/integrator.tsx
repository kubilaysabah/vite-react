import { useMemo, useState } from 'react';
import { type FormikHandlers, type FormikProps } from 'formik';
import { Grid2 as Grid, Autocomplete, LinearProgress, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { TaxPayer } from '~types/tax-payer.ts';
import type { Integrator } from '~types/integrator';

type Props = {
  integrators?: Integrator[];
  values?: TaxPayer | null;
  isPending?: boolean;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: FormikProps<TaxPayer>['setFieldValue'];
}

export default function Integrator({ values, isPending, handleChange, handleBlur, integrators = [], setFieldValue }: Props) {
  const [showKey, setShowKey] = useState<number>(0);

  const options = useMemo(() => {
    return integrators.map((integrator) => ({
      label: integrator.name,
      id: integrator.id,
    }));
  }, [integrators])

  const selectedOption = useMemo(() => {
    if (!options) {
      return null;
    }

    if(values?.integrator_id) {
      return options.find((option) => option.id === values.integrator_id);
    }

    return options[0];
  }, [values?.integrator_id, options]);

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={{ sm:6,  md: 4, lg: 3 }}>
        <Autocomplete
          fullWidth
          disablePortal
          options={options}
          id={'integrator_id'}
          value={selectedOption}
          onChange={(_, newValue) => setFieldValue('integrator_id', newValue?.id)}
          renderInput={(params) => <TextField {...params} label="Entegratör" name={'integrator_id'} value={values?.integrator_id} />}
        />
        {isPending && <LinearProgress />}
      </Grid>

      <Grid size={{ sm:6,  md: 4, lg: 3 }}>
        <TextField
          variant={'outlined'}
          focused
          disabled={isPending}
          fullWidth
          id={'integrator_client_id'}
          name={'integrator_client_id'}
          type={'text'}
          label={'Entegratör Kimlik'}
          value={values?.integrator_client_id}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>

      <Grid size={{ sm:6,  md: 4, lg: 3 }}>
        <FormControl fullWidth variant="outlined" focused>
          <InputLabel htmlFor="integrator_client_secret">{'Gizli Anhatar'}</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            label="Gizli Anahtar"
            id="integrator_client_secret"
            value={values?.integrator_client_secret}
            type={showKey === 1 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showKey === 1 ? 'Gizli anahtarı göster' : 'Gizli anahtarı gizle'
                  }
                  onClick={() => setShowKey(prevState => prevState === 1 ? 0 : 1)}
                  onMouseDown={event =>  event.preventDefault()}
                  onMouseUp={event =>  event.preventDefault()}
                  edge="end"
                >
                  {showKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {isPending && <LinearProgress />}
        </FormControl>
      </Grid>

      <Grid size={{ sm:6,  md: 4, lg: 3 }}>
        <TextField
          variant={'outlined'}
          focused
          disabled={isPending}
          fullWidth
          id={'integrator_username'}
          name={'integrator_username'}
          type={'text'}
          label={'Entegratör Kullanıcı Adı'}
          value={values?.integrator_username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPending && <LinearProgress />}
      </Grid>

      <Grid size={{ sm:6,  md: 4, lg: 3 }}>
        <FormControl fullWidth variant="outlined" focused>
          <InputLabel htmlFor="integrator_password">{'Gizli Anhatar'}</InputLabel>
          <OutlinedInput
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            label="Entegratör Şifresi"
            id="integrator_password"
            value={values?.integrator_password}
            type={showKey === 2 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showKey === 2 ? 'Entegratör şifresini Göster' : 'Entegratör şifresini gizle'
                  }
                  onClick={() => setShowKey(prevState => prevState === 2 ? 0 : 2)}
                  onMouseDown={event =>  event.preventDefault()}
                  onMouseUp={event =>  event.preventDefault()}
                  edge="end"
                >
                  {showKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {isPending && <LinearProgress />}
        </FormControl>
      </Grid>
    </Grid>
  )
}