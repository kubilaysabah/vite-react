import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { GetTaxPayersByUserIdParams, TaxPayer, TaxPayersResponse } from '~types/tax-payer';
import { getSession } from '@utils/session';

export async function getTaxPayersByUserId(params?: GetTaxPayersByUserIdParams): Promise<TaxPayersResponse> {
    const response = await request<TaxPayersResponse>({
        url: ApiRoutes.taxPayer.list(params),
    });

    return response.data;
}

export async function getTaxPayerById(id: string): Promise<TaxPayer | null> {
    const response = await request<TaxPayer>({
        url: ApiRoutes.taxPayer.find(id),
        method: 'GET',
    });

    return response.data;
}

export async function createTaxPayer(body:TaxPayer): Promise<TaxPayer> {
    const session = getSession();

    const response = await request<TaxPayer>({
        url: ApiRoutes.taxPayer.create,
        method: 'POST',
        data: {
            ...body,
            user_id: session?.id,
        }
    });

    return response.data;
}

export async function updateTaxPayerById(id: string, body:TaxPayer): Promise<TaxPayer> {
    const response = await request<TaxPayer>({
        url: ApiRoutes.taxPayer.update(id),
        data: body,
        method: 'PATCH'
    });

    return response.data;
}

export async function deleteTaxPayerById(id: string): Promise<TaxPayer> {
    const response = await request<TaxPayer>({
        url: ApiRoutes.taxPayer.delete(id),
        method: 'DELETE'
    });

    return response.data;
}

export async function matchInvoices(id: string): Promise<string> {
    const response = await request<string>({
        url: ApiRoutes.taxPayer.matchInvoices(id),
        method: 'GET'
    });

    return response.data;
}

export async function matchInvoiceLines(id: string): Promise<string> {
    const response = await request<string>({
        url: ApiRoutes.taxPayer.matchInvoices(id),
        method: 'GET'
    });

    return response.data;
}