import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Pagination, useTheme } from '@mui/material';
import { DataGrid, gridClasses, type GridRenderCellParams } from '@mui/x-data-grid';
import { MoneyFormat } from '@utils/price';
import { useVoucherState } from '@state/voucher.state';
import { useVouchersByTaxPayerIdMutation } from '@api-hooks/useVoucher';
import axios from 'axios';

const columns = [
  {
    field: 'account_name',
    headerName: 'Hesap Adı',
    width: 220
  },
  {
    field: 'account_code',
    headerName: 'Hesap Kodu',
    width: 220
  },
  {
    field: 'invoice_date',
    headerName: 'Fatura Tarihi',
    width: 220
  },
  {
    field: 'description',
    headerName: 'Açıklama',
    width: 220
  },
  {
    field: 'stoppage_code',
    headerName: 'Tevkifat Tür Kodu',
    width: 220
  },
  {
    field: 'stoppage_amount',
    headerName: 'Tevkifat Tutarı',
    width: 220,
    renderCell: (params: GridRenderCellParams) => {
      return MoneyFormat({ value: params.row.stoppage_amount, currency: params.row.currency });
    }
  },
  {
    field: 'debt',
    headerName: 'Borç',
    width: 220,
    renderCell: (params: GridRenderCellParams) => {
      return MoneyFormat({ value: params.row.debt, currency: params.row.currency });
    }
  },
  {
    field: 'credit',
    headerName: 'Alacak',
    width: 220,
    renderCell: (params: GridRenderCellParams) => {
      return MoneyFormat({ value: params.row.credit });
    }
  }
];

export default function Vouchers() {
  const params = useParams();
  const theme = useTheme();
  const filters = useVoucherState((state) => state.filters);
  const vouchers = useVoucherState((state) => state.response);
  const setPage = useVoucherState((state) => state.setPage);
  const setLoading = useVoucherState((state) => state.setLoading);
  const setResponse = useVoucherState((state) => state.setResponse);
  const { mutate, data, isPending: loading, isSuccess } = useVouchersByTaxPayerIdMutation();

  useEffect(() => {
    if(params?.id) {
      mutate({
        tax_payer_id: params?.id,
        page: filters.page || 1,
        limit: filters.limit || 15
      })
    }
  }, [mutate, params?.id, filters?.page, filters?.limit]);

  useEffect(() => {
    if(isSuccess) {
      setResponse(data);
    }
  }, [isSuccess, setResponse, data]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const handleExportToGMS = async () => {
    try {
      // POST isteği atılıyor, response değişkeni kullanılmıyor
      await axios.post('/api/gms-export', { vouchers: vouchers?.data });
      alert('GMS\'ye başarıyla aktarıldı!');
    } catch (error) {
      console.error('GMS aktarımı sırasında hata oluştu:', error);
      alert('GMS aktarımı sırasında bir hata oluştu.');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>Vouchers</h1>
        <Button variant="contained" color="primary" onClick={handleExportToGMS}>
          GMS'ye Aktar
        </Button>
      </Box>
      <DataGrid
        sx={{
          background: theme.palette.background.paper,
          [`& .${gridClasses.cell}`]: {
            py: 1,
            alignItems: 'center',
            display: 'flex',
          }
        }}
        columns={columns}
        rows={vouchers?.data}
        slots={{
          pagination: () => {
            return (
              <Pagination count={vouchers?.meta?.totalPages} page={vouchers?.meta?.page} onChange={(_, page) => setPage(page)} />
            );
          }
        }}
      />
    </Box>
  );
}
