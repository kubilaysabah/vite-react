import type { Response } from './response'

export type GetInvoiceLinesByInvoiceIdParams = { invoice_id?: string, page?: number, limit?: number }

export type InvoiceLine = {
  id: string
  invoice_type: string | null
  name: string
  product_code: null | string
  account_code: null | string,
  unit: null | string,
  quantity: string,
  unit_amount: string,
  discount_rate: string,
  product_amount: string,
  currency: null | string,
  invoice_id: string
}

export type InvoiceLinesResponse = Response<InvoiceLine>