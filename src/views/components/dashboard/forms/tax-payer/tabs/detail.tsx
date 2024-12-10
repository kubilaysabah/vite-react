import { useMemo } from 'react'
import { useNavigation } from 'react-router-dom';
import { type FormikHandlers, type FormikProps } from 'formik';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Grid2 as Grid,
  TextField,
  LinearProgress,
  Autocomplete
} from '@mui/material';
import type { TaxPayer } from '~types/tax-payer.ts';
import type { Activity } from '~types/utils.ts';

type Props = {
  activities?: Activity[];
  values?: TaxPayer | null;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: FormikProps<TaxPayer>['setFieldValue'];
  isPending?: boolean;
}

export default function Detail({ activities = [], values = null, isPending = false, handleChange, handleBlur, setFieldValue }: Props) {
  const { state } = useNavigation();

  const loading = state === 'loading';

  const options = useMemo(() => {
    return activities.map((activity) => ({
      label: `${activity.code} - ${activity.name}`,
      id: activity.id
    }))
  }, [activities]);

  const selectedOption = useMemo(() => {
    if (!options) {
      return null;
    }

    if(values?.activity_id) {
      return options.find((option) => option.id === values.activity_id);
    }

    return options[0];
  }, [values?.activity_id, options]);

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <Autocomplete
          fullWidth
          disablePortal
          options={options}
          id={'activity_id'}
          value={selectedOption}
          onChange={(_, newValue) => setFieldValue('activity_id', newValue?.id)}
          renderInput={(params) => <TextField {...params} label="Faaliyet" name={'activity_id'} value={values?.activity_id} /> }
        />
        {isPending && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'subscribed_capital'}
          value={values?.subscribed_capital}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          label="Taahhüt Edilen Sermaye"
          variant="outlined"
          placeholder="Taahhüt edilen sermayeyi girin"
          type="number"
        />
        {(loading || isPending) && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'paid_capital'}
          value={values?.paid_capital}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          label="Ödenmiş Sermaye"
          variant="outlined"
          placeholder="Ödenmiş sermayeyi girin"
          type="number"
        />
        {(loading || isPending) && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'ssi'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.ssi}
          fullWidth
          label="Bağlı Olduğu SGK"
          variant="outlined"
          placeholder="Bağlı olduğu SGK girin"
          type="text"
        />
        {(loading || isPending) && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'professional_organizations'}
          fullWidth
          label="Bağlı Olduğu Mesleki Teşekkül"
          variant="outlined"
          placeholder="Bağlı olduğu mesleki teşekkülü girin"
          type="text"
          value={values?.professional_organizations}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {(loading || isPending) && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <TextField
          focused
          id={'professional_organizations_number'}
          fullWidth
          label="Mesleki Teşekkül Numarası"
          variant="outlined"
          placeholder="Mesleki teşekkül numarasını girin"
          type="text"
          value={values?.professional_organizations_number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {(loading || isPending) && <LinearProgress />}
      </Grid>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                name={'simple_entry'}
                id={'simple_entry'}
                checked={values?.simple_entry}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            label="Basit Usül"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
