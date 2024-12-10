import { request } from '@utils/request';
import apiRoutes from '@constant/api-routes';
import { PaymentParams, PaymentResponse } from '~types/payment.ts';

export async function payment(body: PaymentParams): Promise<PaymentResponse> {
  const response = await request<PaymentResponse>({
    url: apiRoutes.payment,
    method: 'POST',
    data: body,
  });

  return response.data;
}