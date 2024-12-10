import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { TaxPayerCountParams, VoucherCountParams, InvoiceCountParams } from '~types/user';

export async function taxPayerCount(params: TaxPayerCountParams): Promise<number> {
  const { id, ...body } = params;
  const response = await request<number>({
    url: ApiRoutes.user.taxPayerCount(id),
    method: 'POST',
    data: body
  })

  return response.data;
}

export async function invoiceCount(params: InvoiceCountParams): Promise<number> {
  const { id, ...body } = params;
  const response = await request<number>({
    url: ApiRoutes.user.invoiceCount(id),
    method: 'POST',
    data: body
  })

  return response.data;
}

export async function voucherCount(params: VoucherCountParams): Promise<number> {
  const { id, ...body } = params;
  const response = await request<number>({
    url: ApiRoutes.user.voucherCount(id),
    method: 'POST',
    data: body
  })

  return response.data;
}

export async function remainingCredit(id: string): Promise<number> {
  const response = await request<number>({
    url: ApiRoutes.user.remainingCredit(id),
    method: 'GET',
  })

  return response.data;
}