import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Chip, IconButton, Pagination, useTheme } from '@mui/material';
import { DataGrid, gridClasses, GridRenderCellParams } from '@mui/x-data-grid';
import { RemoveRedEye } from '@mui/icons-material';
import AccountCodeModal from '@components/dashboard/data/account-code';
import { MoneyFormat } from '@utils/price.ts';
import { useAssignAccountCodeMutation } from '@api/hooks/useInvoice';
import { useGetAccountCodesByTaxPayerIdMutation } from '@api/hooks/useAccountPlan';
import { useInvoiceState } from '@state/invoice.state';
import { useInvoiceLineState } from '@state/invoice-line.state';
import type { AccountCode } from '~types/account-plan';

export default function InvoicesDataGrid() {
  const theme = useTheme();
  const { mutate } = useAssignAccountCodeMutation();
  const setInvoiceId = useInvoiceLineState((state) => state.setInvoiceId)
  const loadingInvoices = useInvoiceState((state) => state.loading);
  const invoices = useInvoiceState((state) => state.response);
  const setPage = useInvoiceState((state) => state.setPage);
  const { data: accountPlans, mutate: getAccountPlans, isPending: loadingAccountCodes } = useGetAccountCodesByTaxPayerIdMutation();
  const taxPayerId = useInvoiceState((state) => state.filters.taxPayerId);

  const accountCodes = accountPlans?.map((accountPlan) => ({
    id: accountPlan.id,
    label: `${accountPlan.code} - ${accountPlan.account_name}`
  }));

  useEffect(() => {
    if(taxPayerId) {
      getAccountPlans(taxPayerId);
    }
  }, [taxPayerId, getAccountPlans]);

  const assignAccountCode = ({ newValue, id }: { id: string; newValue: null | AccountCode }) => {
    if (!newValue) {
      return;
    }

    mutate({
      id,
      account_plan_id: newValue.id
    });
  };

  const columns = [
    {
      field: 'detail',
      headerName: 'Detay',
      width: 80,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <IconButton onClick={() => setInvoiceId(row.id)}>
            <RemoveRedEye />
          </IconButton>
        );
      }
    },
    {
      field: 'type',
      headerName: 'Gelen / Giden',
      width: 140,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Chip
            sx={{
              backgroundColor: row.type === 1 ? '#388e3c' : '#0288d1', // Koyu yeşil ve mavi tonları
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 2,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' // Hafif gölge efekti
            }}
            label={row.type === 1 ? 'Gelen Fatura' : 'Giden Fatura'}
          />
        );
      }
    },
    {
      field: 'ETTN',
      headerName: 'ETTN',
      width: 220
    },
    {
      field: 'account_code',
      headerName: 'Hesap Kodu',
      width: 320,
      renderCell: ({ row }: GridRenderCellParams) => (
        <AccountCodeModal
          accountCodes={accountCodes}
          tax_payer_id={row.tax_payer_id}
          loading={loadingInvoices || loadingAccountCodes}
          defaultValue={row?.account_plan?.code}
          tax_number_or_turkish_identity_number={row.tax_number_or_turkish_identity_number}
          invoiceName={row.name}
          onChange={(newValue) => assignAccountCode({ newValue, id: row.id })}
        />
      )
    },
    {
      field: 'tax_number_or_turkish_identity_number',
      headerName: 'TCKN / VKN',
      width: 120
    },
    {
      field: 'name',
      headerName: 'Cari Adı',
      width: 220,
      renderCell: ({ row }: GridRenderCellParams) => {
        return row?.name?.length > 43 ? row.name.substring(0, 40) + '...' : row.name;
      }
    },
    {
      field: 'invoice_date',
      headerName: 'Fatura Tarihi',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return dayjs(row.invoice_date).format('YYYY-MM-DD');
      }
    },
    {
      field: 'invoice_type',
      headerName: 'Fatura Türü',
      width: 120
    },
    {
      field: 'scenario',
      headerName: 'Senaryo',
      width: 140
    },
    {
      field: 'product_or_service_amount',
      headerName: 'Ürün / Hizmet Bedeli',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return MoneyFormat({ value: row.product_or_service_amount, currency: row.currency });
      }
    },
    {
      field: 'total_amount_excluding_taxes',
      headerName: 'KDV Hariç Fiyat',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return MoneyFormat({ value: row.total_amount_excluding_taxes, currency: row.currency });
      }
    },
    {
      field: 'vat_rate',
      headerName: 'KDV Oranı',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return `%${row.vat_rate}`;
      }
    },
    {
      field: 'vat_amount',
      headerName: 'KDV Tutarı',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return MoneyFormat({ value: row.vat_amount, currency: row.currency });
      }
    },
    {
      field: 'total_amount_including_taxes',
      headerName: 'KDV Dahil Fiyat',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return MoneyFormat({ value: row.total_amount_including_taxes, currency: row.currency });
      }
    },
    {
      field: 'total_amount',
      headerName: 'Toplam Tutar',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams) => {
        return MoneyFormat({ value: row.total_amount, currency: row.currency });
      }
    }
  ];

  return (
    <DataGrid
      loading={loadingInvoices || loadingAccountCodes}
      sx={{
        background: theme.palette.background.paper,
        [`& .${gridClasses.cell}`]: {
          py: 1,
          alignItems: 'center',
          display: 'flex'
        },
      }}
      slots={{
        pagination: () => {
          return (
            <Pagination
              count={invoices?.meta?.totalPages}
              page={invoices?.meta?.page}
              onChange={(_, page) => setPage(page)}
            />
          );
        }
      }}
      getRowHeight={() => 'auto'}
      columns={columns}
      rows={invoices?.data}
    />
  )
}