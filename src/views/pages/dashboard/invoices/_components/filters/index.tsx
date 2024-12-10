import { useCallback } from 'react';
import { Button, Grid2 as Grid } from '@mui/material';
import { useMatchInvoicesMutation, useMatchInvoiceLinesMutation } from '@api-hooks/useTaxPayer';
import integrationRoutes from '@constant/integration-routes';
import { BASE_URL } from '@constant/api-routes.ts';
import { useInvoiceState } from '@state/invoice.state';
import { useTaxPayerState } from '@state/tax-payer.state';
import TaxPayer from './tax-payer';
import Date from './date';

export default function InvoicesFilter() {
  const loadingTaxPayers = useTaxPayerState((state) => state.loading);
  const loadingInvoices = useTaxPayerState((state) => state.loading);
  const invoices = useInvoiceState((state) => state.response);
  const setResponse = useInvoiceState((state) => state.setResponse);
  const clearFilters = useInvoiceState((state) => state.clearFilters);
  const taxPayerId = useInvoiceState((state) => state.filters.taxPayerId);
  const taxPayers = useTaxPayerState((state) => state.response);
  const { mutate: matchInvoices, isPending: isLoadingMatchInvoices } = useMatchInvoicesMutation();
  const { mutate: matchInvoiceLines, isPending: isLoadingMatchInvoiceLines } = useMatchInvoiceLinesMutation();

  const integration = useCallback(() => {
    const taxPayer = taxPayers?.data.find((taxPayer) => taxPayer.id === taxPayerId);
    const integrationCode = taxPayer?.integrator?.integration_code;
    const tax_payer_id = taxPayer?.id;

    if (integrationCode && tax_payer_id) {
      const endpoint = integrationRoutes[integrationCode](tax_payer_id);
      const es = new EventSource(BASE_URL + endpoint);
      es.onmessage = (e) => {
        setResponse(JSON.parse(e.data));
      };
    }
  }, [setResponse, taxPayers?.data, taxPayerId]);

  const loading = loadingInvoices || loadingTaxPayers || isLoadingMatchInvoices || isLoadingMatchInvoiceLines;

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TaxPayer />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Date />
      </Grid>
      {(!invoices || invoices?.data?.length === 0) && taxPayerId && (
        <Grid size={{ xs: 12, md: 2, }}>
          <Button disabled={loading} onClick={integration} fullWidth sx={{ height: '100%' }} color={'primary'} variant={'contained'} size={'large'}>
            {'Fatura Entegrasyonu'}
          </Button>
        </Grid>
      )}
      {taxPayerId && (
        <>
          <Grid size={{ xs: 12, md: 2, }}>
            <Button disabled={loading} onClick={() => matchInvoices(taxPayerId)} fullWidth sx={{ height: '100%' }} color={'secondary'} variant={'contained'} size={'large'}>
              {'Fatura Eşleştirme'}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 2, }}>
            <Button disabled={loading} onClick={() => matchInvoiceLines(taxPayerId)} fullWidth sx={{ height: '100%' }} color={'secondary'} variant={'contained'} size={'large'}>
              {'Fatura Satırları Eşleştirme'}
            </Button>
          </Grid>
        </>
      )}
      <Grid size={{ xs: 12, md: 2, }}>
        <Button
          disabled={loading}
          onClick={clearFilters}
          variant={'contained'}
          color={'error'}
          size={'large'}
          sx={{
            minWidth: 220,
            height: '100%',
            fontWeight: 700,
            textTransform: 'none'
          }}
        >
          {'Temizle'}
        </Button>
      </Grid>
    </Grid>
  )
}