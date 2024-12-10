import { useEffect } from 'react';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import { useTaxPayerState } from '@state/tax-payer.state';
import { useInvoiceState } from '@state/invoice.state';
import { useGetTaxPayersByUserId } from '@api/hooks/useTaxPayer';
import useSession from '@hooks/useSession.ts';

export default function FilterInvoicesByTaxPayer() {
  const session = useSession();
  const setResponse = useTaxPayerState((state) => state.setResponse);
  const filters = useInvoiceState((state) => state.filters);
  const setTaxPayerId = useInvoiceState((state) => state.setTaxPayerId);
  const { data: taxPayers, isLoading, isSuccess } = useGetTaxPayersByUserId({ user_id: session?.id });

  useEffect(() => {
    if(isSuccess) {
      setResponse(taxPayers);
    }
  }, [setResponse, taxPayers, isSuccess]);

  return (
    <FormControl fullWidth>
      <InputLabel id="tax-payers-select-label">{'Mükellefler'}</InputLabel>
      <Select
        disabled={isLoading}
        value={filters.taxPayerId}
        labelId={'tax-payers-select-label'}
        variant={'outlined'}
        label={'Mükellefler'}
        onChange={(event) => setTaxPayerId(event.target?.value)}
      >
        {taxPayers?.data.map((taxPayer) => (
          <MenuItem selected={taxPayer.id === filters.taxPayerId} key={taxPayer.id} value={taxPayer.id}>
            {`${taxPayer.firstname} ${taxPayer.lastname}`}
          </MenuItem>
        ))}
      </Select>
      {isLoading && <LinearProgress />}
    </FormControl>
  )
}