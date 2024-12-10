import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { GetIntegratorsParams, IntegratorsResponse, Integrator } from '~types/integrator.ts';

export async function getIntegrators(params?: GetIntegratorsParams): Promise<IntegratorsResponse> {
    const response = await request<IntegratorsResponse>({
        url: ApiRoutes.integrator.list(params),
        method: 'GET',
    });

    return response.data;
}

export async function updateIntegrators(id: string, body: { name: string, phone: string, email: string, city: string }): Promise<Integrator> {
    const response = await request<Integrator>({
        url: ApiRoutes.integrator.update(id),
        data: body,
        method: 'PATCH'
    });

    return response.data;
}

export async function getIntegratorById(id: string): Promise<Integrator> {
    const response = await request<Integrator>({
        url: ApiRoutes.integrator.detail(id),
        method: 'GET'
    });

    return response.data;
}

export async function deleteIntegratorById(id: string): Promise<Integrator> {
    const response = await request<Integrator>({
        url: ApiRoutes.integrator.delete(id),
        method: 'DELETE'
    });

    return response.data;
}
