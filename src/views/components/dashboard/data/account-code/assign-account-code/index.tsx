import { Autocomplete, TextField } from '@mui/material';
import type { AccountCode } from '~types/account-plan.ts';

type Props = {
  onChange: (newValue: AccountCode | null) => void;
  defaultValue: AccountCode | null;
  loading?: boolean;
  accountCodes?: { id: string; label: string; }[];
};

export default function AssignAccountCode({ loading = false, defaultValue = null, onChange, accountCodes = [] }: Props) {
  return (
    <Autocomplete
      disabled={loading}
      defaultValue={defaultValue}
      onChange={(_, newValue) => onChange(newValue)}
      disablePortal
      options={accountCodes || []}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Hesap Kodu" />}
    />
  );
}
