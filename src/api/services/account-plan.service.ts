import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { AccountPlan, CreateAccountCodeParams, GetAccountPlansByTaxPayerIdParams, AccountPlansResponse, AccountCodesResponse } from '~types/account-plan.ts';

export async function uploadAccountPlanExcel(formData: FormData): Promise<void> {
  const response = await request<void>({
    url: ApiRoutes.accountPlan.upload,
    method: 'POST',
    data: formData
  });

  return response.data;
}

export async function getAccountPlanByTaxPayerId(params: GetAccountPlansByTaxPayerIdParams): Promise<AccountPlansResponse> {
  const { tax_payer_id, ...query } = params;
  const response = await request<AccountPlansResponse>({
    url: ApiRoutes.accountPlan.findByTaxPayerId(tax_payer_id, query),
    method: 'GET'
  });

  return response.data;
}

export async function getAccountCodesByTaxPayerId(tax_payer_id: string): Promise<AccountCodesResponse> {
  const response = await request<AccountCodesResponse>({
    url: ApiRoutes.accountPlan.accountCodes(tax_payer_id),
    method: 'GET'
  });

  return response.data;
}

export async function createAccountCode(tax_payer_id: string, body: CreateAccountCodeParams): Promise<AccountPlan> {
  const response = await request<AccountPlan>({
    url: ApiRoutes.accountPlan.createAccountCode(tax_payer_id),
    method: 'POST',
    data: body
  });

  return response.data;
}

export async function updateAccountCode(tax_payer_id: string, account_code: string): Promise<AccountPlan> {
  const response = await request<AccountPlan>({
    url: ApiRoutes.accountPlan.updateAccountCode(tax_payer_id),
    method: 'PATCH',
    data: {
      account_code
    }
  });

  return response.data;
}

export async function deleteAccountPlanById(id: string): Promise<AccountPlan> {
  const response = await request<AccountPlan>({
    method: 'DELETE',
    url: ApiRoutes.accountPlan.deleteAccountPlan(id),
  });

  return response.data;
}
