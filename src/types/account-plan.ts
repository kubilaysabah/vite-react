import type { Response } from './response';

export type AccountPlan = {
  id: string;
  account_plan_id: string;
  code: string;
  account_name: string;
  account_character: number;
  account_level: string;
  debt_amount: string;
  credit_amount: string;
  debt_quantity: string;
  credit_quantity: string;
  vat_rate: string;
  unit: null | string,
  stock_code: null | string,
  turkish_identity_number_or_tax_number: string
  special_code_1: null | string;
  special_code_2: null | string;
  is_have_sub_account: boolean;
  currency: null | string;
  exchange: string;
  use_exchange_difference: boolean;
  exchange_difference_type: string;
  exchange_difference_a_account_code: null | string;
  exchange_difference_b_account_code: null | string;
  exchange_difference: string;
  vat_account_code: null | string;
  stoppage_type_code: null | string;
  stoppage_rate_1: string;
  stoppage_rate_2: string;
  account_name_2: null | string;
  functioning_code: null | string;
  address_number: null | string;
  debt_foreign_currency: string;
  credit_foreign_currency: string;
  created_at: string;
  version: string;
  updatable: boolean;
  tax_payer_id: string;
}

export type AccountCode = {
  label: string;
  id: string;
}

export type CreateAccountCodeParams = {
  account_code: string;
  account_name: string;
}

export type GetAccountPlansByTaxPayerIdParams = {
  page?: number;
  limit?: number;
  tax_payer_id: string;
};

export type AccountCodesResponse = Pick<AccountPlan, 'code' | 'id' | 'account_name'>[];
export type AccountPlansResponse = Response<AccountPlan>