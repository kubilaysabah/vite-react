import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { taxPayerCount, invoiceCount, voucherCount, remainingCredit } from '@services/user.service';
import type { TaxPayerCountParams, VoucherCountParams, InvoiceCountParams } from '~types/user';

export const useTaxPayerCount = () => {
  return useMutation<number, AxiosError, TaxPayerCountParams>({
    mutationKey: ['tax-payer-count'],
    mutationFn: (params: TaxPayerCountParams) => taxPayerCount(params),
  })
}

export const useInvoiceCount = () => {
  return useMutation<number, AxiosError, InvoiceCountParams>({
    mutationKey: ['invoice-count'],
    mutationFn: (params: InvoiceCountParams) => invoiceCount(params),
  })
}

export const useVoucherCount = () => {
  return useMutation<number, AxiosError, VoucherCountParams>({
    mutationKey: ['voucher-count'],
    mutationFn: (params: VoucherCountParams) => voucherCount(params),
  })
}

export const useRemainingCredit = () => {
  return useMutation<number, AxiosError, string>({
    mutationKey: ['remaining-credit'],
    mutationFn: (id: string) => remainingCredit(id),
  })
}