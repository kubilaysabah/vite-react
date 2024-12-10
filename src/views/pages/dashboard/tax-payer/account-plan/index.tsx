import { type ChangeEvent, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Pagination, useTheme } from '@mui/material';
import { DataGrid, gridClasses, type GridRenderCellParams } from '@mui/x-data-grid';
import { useAccountPlanState } from '@state/account-plan.state';
import { useAccountPlanUploadExcelMutation,useAccountPlansByTaxPayerId } from '@api-hooks/useAccountPlan';
import { MoneyFormat } from '@utils/price';
import { excelDateToJSDate } from '@utils/date';
import axios from 'axios';

const columns = [
    {
        field: 'ID',
        headerName: 'ID'
    },
    {
        field: 'code',
        headerName: 'Kod'
    },
    {
        field: 'account_name',
        headerName: 'Hesap Adı'
    },
    {
        field: 'account_character',
        headerName: 'Hesap Karakter'
    },
    {
        field: 'debt_amoount',
        headerName: 'Borç Tutarı',
        renderCell: (params: GridRenderCellParams) => {
            return MoneyFormat({ value: params.row.debt_amount });
        }
    },
    {
        field: 'credit_amount',
        headerName: 'Alacak Tutarı',
        renderCell: (params: GridRenderCellParams) => {
            return MoneyFormat({ value: params.row.credit_amount });
        }
    },
    {
        field: 'debt_quantity',
        headerName: 'Borç Miktarı'
    },
    {
        field: 'credit_quantity',
        headerName: 'Alacak Miktarı'
    },
    {
        field: 'vat_rate',
        headerName: 'KDV Oranı'
    },
    {
        field: 'unit',
        headerName: 'Birim'
    },
    {
        field: 'stock_code',
        headerName: 'Stok Kodu'
    },
    {
        field: 'turkish_identity_number_or_tax_number',
        headerName: 'TCKN VKN'
    },
    {
        field: 'special_code_1',
        headerName: 'Özel Kod 1'
    },
    {
        field: 'special_code_2',
        headerName: 'Özel Kod 2'
    },
    {
        field: 'account_level',
        headerName: 'Hesap Seviye'
    },
    {
        field: 'is_have_sub_account',
        headerName: 'Alt Hesabı Var'
    },
    {
        field: 'currency',
        headerName: 'Döviz Cinsi'
    },
    {
        field: 'exchange',
        headerName: 'Kur Cinsi'
    },
    {
        field: 'use_exchange_difference',
        headerName: 'KF Kullan'
    },
    {
        field: 'exchange_difference_type',
        headerName: 'KF Kur Cinsi'
    },
    {
        field: 'exchange_difference_a_account_code',
        headerName: 'KF A Hesap Kodu'
    },
    {
        field: 'exchange_difference_b_account_code',
        headerName: 'KF B Hesap Kodu'
    },
    {
        field: 'vat_account_code',
        headerName: 'KDV Hesap Kodu'
    },
    {
        field: 'stoppage_type_code',
        headerName: 'Tevkifat Tür Kodu'
    },
    {
        field: 'stoppage_rate_1',
        headerName: 'Tefkifat Oranı 1'
    },
    {
        field: 'stoppage_rate_2',
        headerName: 'Tefkifat Oranı 2'
    },
    {
        field: 'account_name_2',
        headerName: 'Hesap Adı 2'
    },
    {
        field: 'functioning_code',
        headerName: 'Faaliyet Kodu'
    },
    {
        field: 'address_number',
        headerName: 'Adres Numarası'
    },
    {
        field: 'debt_foreign_currency',
        headerName: 'Borç Döviz Tutarı'
    },
    {
        field: 'credit_foreign_currency',
        headerName: 'Alacak Döviz Tutarı'
    },
    {
        field: 'created_at',
        headerName: 'Ekleme Tarihi',
        renderCell: (params: GridRenderCellParams) => {
            return excelDateToJSDate(params.row.created_at);
        }
    },
    {
        field: 'version',
        headerName: 'Version'
    },
    {
        field: 'updatable',
        headerName: 'Değiştirilebilir'
    }
];

export default function AccountPlan() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const params = useParams();
    const theme = useTheme();
    const filters = useAccountPlanState((state) => state.filters);
    const accountPlans = useAccountPlanState((state) => state.response);
    const setResponse = useAccountPlanState((state) => state.setResponse);
    const setPage = useAccountPlanState((state) => state.setPage);
    const loading = useAccountPlanState((state) => state.loading);

    const { mutate: fetchAccountPlans, isSuccess, data } = useAccountPlansByTaxPayerId();
    const { mutate: uploadExcel, isPending } = useAccountPlanUploadExcelMutation();

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const files = event?.target?.files;
            const file = files ? files[0] : null;
            const formData = new FormData();

            if(file) {
                formData.append('file', file);
            }

            if(params?.id) {
                formData.append('tax_payer_id', params.id);
            }

            uploadExcel(formData);
        },
        [uploadExcel, params?.id]
    );

    const handleGmsTransfer = useCallback(async () => {
        if (params?.id) {
            try {
                const response = await axios.post('/api/gms-transfer', {
                    tax_payer_id: params.id,
                });
                if (response.status === 200) {
                    alert('GMS\'ye aktarım başarılı!');
                } else {
                    alert('GMS\'ye aktarım sırasında bir hata oluştu.');
                }
            } catch (error) {
                console.error('GMS aktarım hatası:', error);
                alert('GMS\'ye aktarım başarısız oldu!');
            }
        }
    }, [params?.id]);

    useEffect(() => {
        if(params.id) {
            fetchAccountPlans({
                page: filters.page,
                limit: filters.limit,
                tax_payer_id: params.id
            });
        }
    }, [params?.id, filters.page, filters.limit, fetchAccountPlans]);

    useEffect(() => {
        if(isSuccess) {
            setResponse(data);
        }
    }, [isSuccess, data, setResponse])

    return (
        <Box title="Hesap Planı">
            <input hidden type="file" name={'file'} ref={fileInputRef} onChange={handleFileChange} />
            <Button disabled={loading || isPending} variant="contained" component="span" color="success" onClick={() => fileInputRef?.current?.click()} sx={{ mb: 3 }}>
                {'Excel Yükle'}
            </Button>
            <Button
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={handleGmsTransfer}
                sx={{ mb: 3, ml: 4 }}
            >
                {'GMS\'ye Aktar'}
            </Button>
            <DataGrid
                loading={loading}
                sx={{
                    background: theme.palette.background.paper,
                    [`& .${gridClasses.cell}`]: {
                        py: 1,
                        alignItems: 'center',
                        display: 'flex'
                    },
                }}
                columns={columns}
                rows={accountPlans?.data}
                slots={{
                    pagination: () => {
                        return (
                            <Pagination
                                count={accountPlans?.meta?.totalPages}
                                page={accountPlans?.meta?.page}
                                onChange={(_, page) => setPage(page)}
                            />
                        );
                    }
                }}
            />
        </Box>
    );
}
