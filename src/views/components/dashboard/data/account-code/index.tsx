import { useState } from 'react';
import { Grid2 as Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { AccountCode } from '~types/account-plan';
import CreateAccountCode from './create-account-code';
import AssignAccountCode from './assign-account-code';

type Props = {
  invoiceName?: string;
  tax_payer_id?: string;
  tax_number_or_turkish_identity_number?: string;
  defaultValue: AccountCode | null;
  onChange: (newValue: AccountCode | null) => void;
  loading: boolean;
  accountCodes?: { label: string; id: string; }[];
};

export default function AccountCode({ accountCodes = [], tax_payer_id, loading = false, defaultValue, invoiceName, tax_number_or_turkish_identity_number, onChange }: Props) {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} columnSpacing={2} sx={{
      width: '100%'
    }}>
      <Grid size={'grow'}>
        <AssignAccountCode accountCodes={accountCodes} loading={loading} defaultValue={defaultValue} onChange={onChange} />
      </Grid>
      <Grid>
        <IconButton disabled={loading} onClick={() => setShowCreateModal((prevState) => !prevState)}>
          <Add />
        </IconButton>
      </Grid>
      {showCreateModal && (
        <CreateAccountCode
          tax_payer_id={tax_payer_id}
          loading={loading}
          invoiceName={invoiceName}
          tax_number_or_turkish_identity_number={tax_number_or_turkish_identity_number}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </Grid>
  )
}