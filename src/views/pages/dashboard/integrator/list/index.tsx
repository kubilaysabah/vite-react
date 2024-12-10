import { Link } from 'react-router-dom';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { IconButton, Pagination, useTheme, Tooltip, Grid2 as Grid } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useIntegratorState } from '@state/integrator.state';
import { useGetIntegratorsMutation } from '@api-hooks/useIntegrator';
import Routes from '@constant/page-routes';
import { useEffect } from 'react';

export default function IntegratorList() {
    const theme = useTheme();
    const { data, isSuccess, isPending: isLoading, mutate } = useGetIntegratorsMutation();
    const integrators = useIntegratorState((state) => state.response);
    const loading = useIntegratorState((state) => state.loading);
    const filters = useIntegratorState((state) => state.filters);
    const setPage = useIntegratorState((state) => state.setPage);
    const setLoading = useIntegratorState((state) => state.setLoading);
    const setResponse = useIntegratorState((state) => state.setResponse);

    useEffect(() => {
        mutate({
            page: filters.page || 1,
            limit: filters.limit || 15,
        });
    }, [mutate, filters?.page, filters?.limit])

    useEffect(() => {
        if(isSuccess) {
            setResponse(data);
        }
    }, [setResponse, isSuccess, data]);

    useEffect(() => {
        setLoading(isLoading);
    }, [setLoading, isLoading])

    const columns = [
        {
            field: 'name',
            headerName: 'Entegratör Adı',
            width: 500
        },
        {
            field: 'phone',
            headerName: 'Entegratör Telefonu',
            width: 170
        },
        {
            field: 'email',
            headerName: 'Entegratör E-Posta',
            width: 220
        },
        {
            field: 'city',
            headerName: 'Entegratör Şehir',
            width: 200
        },
        {
            field: 'invoices',
            headerName: 'Faturalar',
            width: 120,
            renderCell: () => {
                return (
                  <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{
                      width: '100%'
                  }}>
                      <Grid>
                          <Tooltip title={'Gelen Faturalar'} placement={'top'}>
                              <IconButton
                                disabled={loading}
                                component={Link}
                                to={Routes.invoices}
                              >
                                  <ArrowLeftToLine />
                              </IconButton>
                          </Tooltip>
                      </Grid>
                      <Grid>
                          <Tooltip title={'Giden Faturalar'} placement={'top'}>
                              <IconButton
                                disabled={loading}
                                component={Link}
                                to={Routes.invoices}
                              >
                                  <ArrowRightToLine />
                              </IconButton>
                          </Tooltip>
                      </Grid>
                  </Grid>
                );
            }
        }
    ];

    return (
        <DataGrid
            loading={loading}
            sx={{
                background: theme.palette.background.paper,
                [`& .${gridClasses.cell}`]: {
                    py: 1,
                    alignItems: 'center',
                    display: 'flex',
                }
            }}
            getRowHeight={() => 'auto'}
            columns={columns}
            rows={integrators?.data}
            slots={{
                pagination: () => {
                    return (
                        <Pagination
                            count={integrators?.meta?.totalPages}
                            page={integrators?.meta?.page}
                            onChange={(_, page: number) => setPage(page)}
                        />
                    );
                }
            }}
        />
    );
}
