import { type AxiosError } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getIntegrators } from '@services/integrator.service';
import type { GetIntegratorsParams, IntegratorsResponse } from '~types/integrator';

export const useGetIntegrators = (params?: GetIntegratorsParams) => {
    return useQuery<IntegratorsResponse, AxiosError, IntegratorsResponse>({
        queryKey: ['integrators', params],
        queryFn: () => getIntegrators(params)
    });
};

export const useGetIntegratorsMutation = () => {
    return useMutation<IntegratorsResponse, AxiosError, GetIntegratorsParams>({
        mutationKey: ['integrators'],
        mutationFn: (params: GetIntegratorsParams) => getIntegrators(params)
    })
}
