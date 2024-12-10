import { useEffect } from 'react';
import { Grid2 as Grid, Box, Typography, useTheme, Skeleton } from '@mui/material';
import { useGetTaxPayersByUserId } from '@api-hooks/useTaxPayer';
import { useTaxPayerCount, useInvoiceCount, useVoucherCount, useRemainingCredit } from '@api-hooks/useUser';
import TaxPayerList from '@components/dashboard/tax-payer';
import useSession from '@hooks/useSession';

export default function Dashboard() {
  const theme = useTheme();
  const { data: taxPayers } = useGetTaxPayersByUserId({ page: 1, limit: 10 });
  const session = useSession();
  const { data: taxPayerCount, mutate: getTaxPayerCount, isPending: loadingTaxPayerCount }  = useTaxPayerCount();
  const { data: invoiceCount, mutate: getInvoiceCount, isPending: loadingInvoiceCount }  = useInvoiceCount();
  const { data: voucherCount, mutate: getVoucherCount, isPending: loadingVoucherCount }  = useVoucherCount();
  const { data: remainingCredit, mutate: getRemainingCredit, isPending: loadingCredit } = useRemainingCredit();

  useEffect(() => {
    if(!session) {
      return;
    }

    getTaxPayerCount({ id: session.id })
    getInvoiceCount({ id: session.id })
    getVoucherCount({ id: session.id })
    getRemainingCredit(session.id);
  }, [session, getTaxPayerCount, getInvoiceCount, getVoucherCount, getRemainingCredit])

  return (
    <Box>
      <Grid container spacing={2} marginBottom={3}>
        <Grid size={{ sm: 6, md: 4, lg: 3 }}>
          {loadingTaxPayerCount ? (
            <Skeleton
              variant={'rectangular'} sx={{
              height: 124,
            }}
            />
          ) : (
            <Box sx={{
              padding: 2,
              background: theme.palette.background.paper,
              borderRadius: 2,
              position: 'relative'
            }}>
              <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: 2 }}>{'Toplam Mükellef'}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: 2 }}>{taxPayerCount}</Typography>
            </Box>
          )}
        </Grid>
        <Grid size={{ sm: 6, md: 4, lg: 3 }}>
          {loadingInvoiceCount ? (
            <Skeleton variant={'rectangular'} sx={{ height: 124 }} />
            ): (
            <Box sx={{
              padding: 2,
              background: theme.palette.background.paper,
              borderRadius: 2,
              position: 'relative'
            }}>
              <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: 2 }}>{'Toplam Fatura'}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: 2 }}>{invoiceCount}</Typography>
            </Box>
          )}
        </Grid>
        <Grid size={{ sm: 6, md: 4, lg: 3 }}>
          {loadingVoucherCount ? (
            <Skeleton variant={'rectangular'} sx={{ height: 124 }} />
          ): (
            <Box sx={{
              padding: 2,
              background: theme.palette.background.paper,
              borderRadius: 2,
              position: 'relative'
            }}>
              <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: 2 }}>{'Toplam Fiş'}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: 2 }}>{voucherCount}</Typography>
            </Box>
          )}
        </Grid>
        <Grid size={{ sm: 6, md: 4, lg: 3 }}>
          {loadingCredit ? (
            <Skeleton variant={'rectangular'} sx={{ height: 124 }} />
            ): (
            <Box sx={{
              padding: 2,
              background: theme.palette.background.paper,
              borderRadius: 2,
              position: 'relative'
            }}>
              <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: 2 }}>{'Kalan Kontör'}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: 2 }}>{remainingCredit}</Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {taxPayers && (
        <TaxPayerList taxPayers={taxPayers} />
      )}
    </Box>
  );
}
