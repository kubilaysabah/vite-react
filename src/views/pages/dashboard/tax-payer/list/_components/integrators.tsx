import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import { useTaxPayerState } from '@state/tax-payer.state';
import { useGetIntegrators } from '@api-hooks/useIntegrator'

export default function FilterTaxPayersByIntegrator() {
  const setIntegratorId = useTaxPayerState((state) => state.setIntegratorId)
  const integratorId = useTaxPayerState((state) => state.filters.integratorId)
  const loadingTaxPayers = useTaxPayerState((state) => state.loading)
  const { data: integrators, isLoading: loadingIntegrators } = useGetIntegrators();

  return (
    <FormControl fullWidth>
      <InputLabel id="integrators-dropdown-label">{'Entegratörler'}</InputLabel>
      <Select
        disabled={loadingTaxPayers || loadingIntegrators}
        id={'integrators-dropdown'}
        labelId={'integrators-dropdown-label'}
        variant={'outlined'}
        label={'Entegratörler'}
        value={integratorId}
        onChange={(event) => setIntegratorId(event.target.value)}
      >
        {integrators?.data?.map((integrator) => (
          <MenuItem selected={integrator.id === integratorId} key={integrator.id} value={integrator.id}>
            {integrator.name}
          </MenuItem>
        ))}
      </Select>
      {(loadingTaxPayers || loadingIntegrators) && <LinearProgress />}
    </FormControl>
  )
}