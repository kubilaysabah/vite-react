import type { Response } from './response';

export type GetVouchersParams = {
  page?: number;
  limit?: number;
  invoice_id?: string;
  tax_payer_id: string;
}

export type Voucher = {
  id: string;
  currency: string;
  account_name: string;
  account_code: string;
  invoice_type: null | string;
  invoice_date: string;
  invoice_number: null | string;
  stock_code: null | string;
  vat_number_or_turkish_identity_number: string;
  description: string | null;
  quantity: string;
  vat_rate: string;
  vat_amount: string;
  stoppage_code: string;
  stoppage_rate: string;
  stoppage_amount: string;
  debt: string;
  credit: string;
  invoice_line_id: string;
  invoice_id: null | string;
  tax_payer_id: string;
}

export type VouchersResponse = Response<Voucher>;