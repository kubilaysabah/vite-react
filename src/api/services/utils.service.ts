import { request } from '@utils/request';
import ApiRoutes from '@constant/api-routes';
import type { ActivitiesResponse, GetActivitiesParams } from '~types/utils.ts';

export async function getActivities(params?: GetActivitiesParams): Promise<ActivitiesResponse> {
    const response = await request<ActivitiesResponse>({
        url: ApiRoutes.utils.activity.list(params),
        method: 'GET'
    });

    return response.data;
}
