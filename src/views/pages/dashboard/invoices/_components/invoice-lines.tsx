import { useEffect, useMemo } from 'react';
import { useTheme, Pagination, Grid2 as Grid, Typography, Button, Dialog } from '@mui/material';
import { Close } from '@mui/icons-material';
import { DataGrid, gridClasses, type GridRenderCellParams } from '@mui/x-data-grid';
import { useGetInvoiceLinesByInvoiceIdMutation, useAssignAccountCode } from '@api/hooks/useInvoiceLine.ts';
import { MoneyFormat } from '@utils/price.ts';
import { useInvoiceState } from '@state/invoice.state';
import { useInvoiceLineState } from '@state/invoice-line.state.ts';
import AccountCodeModal from '@components/dashboard/data/account-code';
import type { InvoiceTax } from '~types/invoice.ts';
import type { AccountCode } from '~types/account-plan.ts';

export default function InvoiceLines() {
  const theme = useTheme();
  const { data: invoiceLineResponse, isSuccess: isSuccessInvoiceLines, mutate: fetchInvoiceLines, isPending: loadingInvoiceLines } = useGetInvoiceLinesByInvoiceIdMutation();
  const { mutate: assignAccountCodeToInvoiceLine, isPending: loadingAccountCodes } = useAssignAccountCode();
  const invoices = useInvoiceState((state) => state.response);
  const invoiceLines = useInvoiceLineState((state) => state.response);
  const setResponse = useInvoiceLineState((state) => state.setResponse);
  const filters = useInvoiceLineState((state) => state.filters);
  const setPage = useInvoiceLineState((state) => state.setPage);
  const clearFilters = useInvoiceLineState((state) => state.clearFilters);
  const loading = loadingInvoiceLines || loadingAccountCodes;

  const assignAccountCode = ({ newValue, id }: { id: string; newValue: null | AccountCode }) => {
    if (!newValue) {
      return;
    }

    assignAccountCodeToInvoiceLine({
      id,
      account_plan_id: newValue.id
    });
  };

  useEffect(() => {
    if(filters.invoiceId) {
      fetchInvoiceLines({
        invoice_id: filters.invoiceId,
        page: filters.page || 1,
        limit: filters.limit || 15
      });
    }
  }, [setResponse, filters.invoiceId, filters.page, filters.limit, fetchInvoiceLines]);

  useEffect(() => {
    if(isSuccessInvoiceLines) {
      setResponse(invoiceLineResponse);
    }
  }, [isSuccessInvoiceLines, setResponse, invoiceLineResponse])

  const invoice = useMemo(
    () => invoices?.data.find((invoice) => invoice.id === filters.invoiceId),
    [invoices, filters.invoiceId]
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Ürün / Hizmet',
      width: 220
    },
    {
      field: 'account_code',
      headerName: 'Hesap Kodu',
      width: 400,
      renderCell: ({ row }: GridRenderCellParams) => (
        <AccountCodeModal
          tax_payer_id={invoice?.tax_payer_id}
          loading={loading}
          defaultValue={row?.account_plan?.code}
          tax_number_or_turkish_identity_number={row.tax_number_or_turkish_identity_number}
          invoiceName={row.name}
          onChange={(newValue) => assignAccountCode({ newValue, id: row.id })}
        />
      )
    },
    {
      field: 'unit',
      headerName: 'Adet / Birim',
      width: 220
    },
    {
      field: 'unit_amount',
      headerName: 'Birim Fiyat',
      width: 220,
      renderCell: (params: GridRenderCellParams) => {
        return MoneyFormat({ value: params.row.unit_amount, currency: params.row.currency });
      }
    },
    {
      field: 'vat_amount',
      headerName: 'KDV Tutarı',
      width: 220,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row?.taxes?.length > 0) {
          const tax = params.row.taxes.find((tax: InvoiceTax) => tax.name.trim().toUpperCase().includes('KDV'));
          return MoneyFormat({ value: tax?.amount || 0, currency: tax?.currency });
        }

        return MoneyFormat({ value: params.row.product_amount, currency: params.row.currency });
      }
    },
    {
      field: 'product_amount',
      headerName: 'Ürün / Hizmet Bedeli',
      width: 220,
      renderCell: (params: GridRenderCellParams) => {
        return MoneyFormat({ value: params.row.product_amount, currency: params.row.currency });
      }
    }
  ];

  return (
    <Dialog fullScreen open={!!filters.invoiceId} onClose={clearFilters}>
      <Grid container spacing={3} alignItems={'center'} paddingX={3}>
        <Grid size={'grow'}>
          <Typography component={'h3'} fontWeight={700}>
            {invoice?.name}
          </Typography>
        </Grid>
        <Grid>
          <Button color={'inherit'} variant={'text'} size={'large'} onClick={clearFilters}>
            <Close />
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        sx={{
          background: theme.palette.background.paper,
          [`& .${gridClasses.cell}`]: {
            py: 1,
            alignItems: 'center',
            display: 'flex',
          }
        }}
        slots={{
          pagination: () => {
            return <Pagination count={invoiceLines?.meta.totalPages} page={invoiceLines?.meta.page} onChange={(_, page) => setPage(page)} />;
          }
        }}
        getRowHeight={() => 'auto'}
        columns={columns}
        rows={invoiceLines?.data}
        loading={loading}
      />
    </Dialog>
  );
}
