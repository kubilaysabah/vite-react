import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useInvoiceState } from '@state/invoice.state';
import { useInvoices } from '@api-hooks/useInvoice';
import Filters from './_components/filters';
import DataGrid from './_components/datagrid';
import InvoiceLines from './_components/invoice-lines';

export default function Invoices() {
  const setLoading = useInvoiceState((state) => state.setLoading);
  const setResponse = useInvoiceState((state) => state.setResponse);
  const filters = useInvoiceState((state) => state.filters);
  const { mutate, isPending: loadingInvoices, isSuccess: isSuccessInvoices, data: invoicesResponse } = useInvoices();

  useEffect(() => {
    if(invoicesResponse) {
      setResponse(invoicesResponse);
    }
  }, [setResponse, isSuccessInvoices, invoicesResponse]);

  useEffect(() => {
    setLoading(loadingInvoices);
  }, [setLoading, loadingInvoices])

  useEffect(() => {
    mutate({
      ...(filters.integratorId && ({ integrator_id: filters.integratorId, })),
      ...(filters.taxPayerId && ({ tax_payer_id: filters.taxPayerId, })),
      ...(filters.date.start && ({ startDate: filters.date.start, })),
      ...(filters.date.end && ({ endDate: filters.date.end, })),
      page: filters.page || 1,
      limit: filters.limit || 15,
    });
  }, [filters, mutate])

  return (
    <Box>
      <Filters />
      <DataGrid />
      <InvoiceLines />
    </Box>
  );
}
