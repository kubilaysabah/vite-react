import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useMessageStore } from '@state/toast.state.ts';

export default function Alert() {
  const { show, message, status, duration } = useMessageStore((state) => state.message);
  const closeMessage = useMessageStore((state) => state.closeMessage);

  return (
    <Snackbar
      onClose={closeMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={show}
      autoHideDuration={duration}
    >
      <MuiAlert onClose={closeMessage} severity={status} variant="filled" sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}