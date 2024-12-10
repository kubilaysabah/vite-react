import type { Response } from './response'
import type { AccountPlan } from './account-plan';

export type GetInvoiceParams = {
  integrator_id?: string;
  tax_payer_id?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
};

export type AssignAccountCodeParams = { id: string; account_plan_id: string; };

export type InvoiceTax = {
  id: string
  name: string
  amount: string
  rate: string
  code: string
  currency: string
  invoice_id: string
}

export type Invoice = {
  id: string
  ETTN: string
  name: string
  account_code: null | string
  tax_number_or_turkish_identity_number: string
  invoice_number: string
  invoice_date: string // Date
  invoice_type: string
  scenario: string
  total_amount: string
  vat_rate: string;
  vat_amount: string;
  product_or_service_amount: string
  total_amount_including_taxes: string
  total_amount_excluding_taxes: string
  discount_amount: null | string,
  discount_rate: string | null,
  increase_rate: string | null,
  increase_amount: null | string,
  currency: string,
  tax_payer_id: string,
  taxes: InvoiceTax[]
  account_plan: AccountPlan | null;
}

export type InvoicesResponse = Response<Invoice>