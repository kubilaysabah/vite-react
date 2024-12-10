import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { InvoiceLinesResponse, InvoiceLine, GetInvoiceLinesByInvoiceIdParams } from '~types/invoice-line';

export async function getInvoiceLinesByInvoiceId(params?: GetInvoiceLinesByInvoiceIdParams): Promise<InvoiceLinesResponse> {
  const response = await request<InvoiceLinesResponse>({
    url: ApiRoutes.invoiceLine.list(params),
    method: 'GET'
  });

  return response.data;
}

export async function assignAccountCode(id: string, account_plan_id: string): Promise<InvoiceLine> {
  const response = await request<InvoiceLine>({
    url: ApiRoutes.invoiceLine.assignAccountCode(id),
    method: 'PATCH',
    data: {
      account_plan_id
    }
  });

  return response.data;
}
