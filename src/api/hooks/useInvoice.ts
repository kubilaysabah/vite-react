import { type AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getInvoices, assignAccountCode } from '@services/invoice.service';
import { AssignAccountCodeParams, GetInvoiceParams, Invoice, InvoicesResponse } from '~types/invoice';

export const useGetInvoices = (params?: GetInvoiceParams) => {
    return useQuery<InvoicesResponse, AxiosError, InvoicesResponse>({
        queryKey: ['get-invoices', params],
        queryFn: (): Promise<InvoicesResponse> => getInvoices(params),
    });
};

export const useInvoices = () => {
    return useMutation<InvoicesResponse, AxiosError, GetInvoiceParams>({
        mutationKey: ['invoices'],
        mutationFn: (params: GetInvoiceParams): Promise<InvoicesResponse> => getInvoices(params),
    })
}

export const useAssignAccountCodeMutation = () => {
    return useMutation<Invoice, AxiosError, AssignAccountCodeParams>({
        mutationKey: ['assign-account-code'],
        mutationFn: ({ id, account_plan_id }: AssignAccountCodeParams): Promise<Invoice> => assignAccountCode(id, account_plan_id)
    });
};