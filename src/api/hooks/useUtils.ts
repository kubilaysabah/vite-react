import { type AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@services/utils.service';
import type { ActivitiesResponse, GetActivitiesParams } from '~types/utils';

export const useGetActivities = (params?: GetActivitiesParams) => {
    return useQuery<ActivitiesResponse, AxiosError, ActivitiesResponse>({
        queryKey: ['activities', params],
        queryFn: (): Promise<ActivitiesResponse> => getActivities(params)
    });
};
