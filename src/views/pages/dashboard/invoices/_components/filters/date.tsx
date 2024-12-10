import dayjs from 'dayjs';
import { Grid2 as Grid, LinearProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useInvoiceState } from '@state/invoice.state';

export default function FilterInvoicesByDate() {
  const loading = useInvoiceState((state) => state.loading);
  const filters = useInvoiceState((state) => state.filters);
  const setDate = useInvoiceState((state) => state.setDate);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs:12, md: 6 }}>
        <DatePicker
          disabled={loading}
          label="Başlangıç Tarihi"
          sx={{
            width: '100%'
          }}
          value={filters.date.start ? dayjs(filters.date.start) : null}
          onChange={(newDate) => setDate('start', dayjs(newDate).toISOString())}
        />
        {loading && <LinearProgress />}
      </Grid>
      <Grid size={{ xs: 12, md: 6, }}>
        <DatePicker
          disabled={loading}
          label="Bitiş Tarihi"
          sx={{
            width: '100%'
          }}
          value={filters.date.end ? dayjs(filters.date.end) : null}
          onChange={(newDate) => setDate('end', dayjs(newDate).toISOString())}
        />
        {loading && <LinearProgress />}
      </Grid>
    </Grid>
  )
}