import { useMutation } from '@tanstack/react-query';
import { payment } from '@services/payment.service';
import { PaymentParams, PaymentResponse } from '~types/payment';
import { AxiosError } from 'axios';

export const usePayment = () => {
  return useMutation<PaymentResponse, AxiosError, PaymentParams>({
    mutationKey: ['payment'],
    mutationFn: (params: PaymentParams) => payment(params)
  })
}