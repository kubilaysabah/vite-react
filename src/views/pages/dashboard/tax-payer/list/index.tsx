import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Grid2 as Grid,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTaxPayersByUserId } from '@api-hooks/useTaxPayer';
import { useTaxPayerState } from '@state/tax-payer.state';
import pageRoutes from '@constant/page-routes';
import TaxPayerList from '@components/dashboard/tax-payer';
import Integrators from './_components/integrators';

export default function TaxPayers() {
  const filters = useTaxPayerState((state) => state.filters);
  const loadingTaxPayer = useTaxPayerState((state) => state.loading);
  const setLoading = useTaxPayerState((state) => state.setLoading);
  const setResponse = useTaxPayerState((state) => state.setResponse);
  const taxPayers = useTaxPayerState((state) => state.response);
  const setPage = useTaxPayerState((state) => state.setPage);
  const { mutate, isPending, isSuccess, data } = useTaxPayersByUserId();

  useEffect(() => {
    mutate({
      page: filters.page || 1,
      limit: filters.limit || 15,
      ...(filters.integratorId && ({ integrator_id: filters.integratorId })),
    })
  }, [mutate, filters.page, filters.limit, filters.integratorId]);

  useEffect(() => {
    setLoading(isPending);
  }, [setLoading, isPending]);

  useEffect(() => {
    if(isSuccess) {
      setResponse(data);
    }
  }, [setResponse, isSuccess, data]);

  return (
    <Box>
      <Grid container spacing={2} mb={3}>
        <Grid>
          <Button
            disabled={loadingTaxPayer}
            component={Link}
            variant={'contained'}
            color={'success'}
            size={'large'}
            sx={{
              minWidth: 220,
              height: '100%',
              fontWeight: 700,
              textTransform: 'none'
            }}
            startIcon={<Add />}
            to={pageRoutes.taxPayer.create}
          >
            {'Mükellef Oluştur'}
          </Button>
        </Grid>
        <Grid>
          <Button
            disabled={loadingTaxPayer}
            variant={'contained'}
            color={'primary'}
            size={'large'}
            sx={{
              minWidth: 220,
              height: '100%',
              fontWeight: 700,
              textTransform: 'none'
            }}
            startIcon={<Add />}
          >
            {'Hesap Planı Yükle'}
          </Button>
        </Grid>
        <Grid size={'grow'}>
          <Integrators />
        </Grid>
      </Grid>
      {taxPayers && <TaxPayerList onPageChange={setPage} taxPayers={taxPayers}  />}
    </Box>
  );
}
