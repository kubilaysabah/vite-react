import ApiRoutes from '@constant/api-routes';
import type { GetInvoiceParams, Invoice, InvoicesResponse } from '~types/invoice';
import { request } from '@utils/request';

export async function getInvoices(params?: GetInvoiceParams): Promise<InvoicesResponse> {
  const response = await request<InvoicesResponse>({
    url: ApiRoutes.invoice.list(params),
    method: 'GET'
  });

  return response.data;
}

export async function assignAccountCode(id: string, account_plan_id: string): Promise<Invoice> {
  const response = await request<Invoice>({
    url: ApiRoutes.invoice.assignAccountCode(id),
    method: 'PATCH',
    data: {
      account_plan_id
    },
  });

  return response.data;
}
