import type { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createAccountCode,
  getAccountCodesByTaxPayerId,
  getAccountPlanByTaxPayerId,
  uploadAccountPlanExcel,
  updateAccountCode,
  deleteAccountPlanById
} from '@services/account-plan.service';
import { useMessageStore } from '@state/toast.state';
import type { CreateAccountCodeParams, GetAccountPlansByTaxPayerIdParams, AccountPlan, AccountPlansResponse, AccountCodesResponse } from '~types/account-plan.ts';

export const useAccountPlanUploadExcelMutation = () => {
  const showMessage = useMessageStore((state) => state.showMessage);

  return useMutation({
    mutationFn: uploadAccountPlanExcel,
    onError: (error) => {
      console.log(error);
      showMessage({
        status: 'error',
        message: 'Hesap planı excel yüklenirken bir problem oluştu, lütfen dosyanızı kontrol edin.'
      });
    }
  });
};

export const useGetAccountPlansByTaxPayerId = (params: GetAccountPlansByTaxPayerIdParams) => {
  return useQuery<AccountPlansResponse, AxiosError, AccountPlansResponse>({
    queryKey: ['account-plan-by-tax-payer-id', params],
    queryFn: () => getAccountPlanByTaxPayerId(params)
  });
};

export const useAccountPlansByTaxPayerId = () => {
  return useMutation<AccountPlansResponse, AxiosError, GetAccountPlansByTaxPayerIdParams>({
    mutationKey: ['account-plans-by-tax-payer-id'],
    mutationFn: (params: GetAccountPlansByTaxPayerIdParams) => getAccountPlanByTaxPayerId(params)
  });
};

export const useGetAccountCodesByTaxPayerId = (tax_payer_id: string) => {
  return useQuery({
    queryKey: ['account-codes-by-tax-payer-id', tax_payer_id],
    queryFn: () => getAccountCodesByTaxPayerId(tax_payer_id)
  });
};

export const useGetAccountCodesByTaxPayerIdMutation = () => {
  return useMutation<AccountCodesResponse, AxiosError, string>({
    mutationKey: ['account-codes-by-tax-payer-id'],
    mutationFn: (tax_payer_id: string) => getAccountCodesByTaxPayerId(tax_payer_id)
  })
};

export const useCreateAccountCodeMutation = () => {
  return useMutation<AccountPlan, AxiosError, { tax_payer_id: string; body: CreateAccountCodeParams; }>({
    mutationKey: ['create-account-code'],
    mutationFn: ({ tax_payer_id, body }: { tax_payer_id: string; body: CreateAccountCodeParams }) => createAccountCode(tax_payer_id, body)
  });
};

export const useUpdateAccountCodeMutation = () => {
  return useMutation<AccountPlan, AxiosError, { tax_payer_id: string; account_code: string; }>({
    mutationKey: ['update-account-code'],
    mutationFn: ({ tax_payer_id, account_code }: { tax_payer_id: string; account_code: string; }): Promise<AccountPlan> => updateAccountCode(tax_payer_id, account_code)
  })
}

export const useDeleteAccountPlanMutation = () => {
  return useMutation<AccountPlan, AxiosError, string>({
    mutationKey: ['delete-account-plan-by-id'],
    mutationFn: (tax_payer_id: string): Promise<AccountPlan> => deleteAccountPlanById(tax_payer_id)
  })
}