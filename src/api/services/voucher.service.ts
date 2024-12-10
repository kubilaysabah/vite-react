import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { GetVouchersParams, VouchersResponse } from '~types/voucher';

export async function getVouchersByTaxPayerId(params: GetVouchersParams): Promise<VouchersResponse> {
    const response = await request<VouchersResponse>({
        url: ApiRoutes.voucher.list(params),
        method: 'GET',
    });

    return response.data;
}
