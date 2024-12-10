import { type AxiosError } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getVouchersByTaxPayerId } from '@services/voucher.service';
import type { GetVouchersParams, VouchersResponse } from '~types/voucher';

export const useVoucherByTaxPayerId = (params: GetVouchersParams) => {
    return useQuery<VouchersResponse, AxiosError, VouchersResponse>({
        queryKey: ['vouchers', params],
        queryFn: () => getVouchersByTaxPayerId(params)
    })
};

export const useVouchersByTaxPayerIdMutation = () => {
    return useMutation<VouchersResponse, AxiosError, GetVouchersParams>({
        mutationKey: ['get-voucher-by-tax-payer-id'],
        mutationFn: (params: GetVouchersParams) => getVouchersByTaxPayerId(params)
    })
}