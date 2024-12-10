import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { assignAccountCode, getInvoiceLinesByInvoiceId } from '@services/invoice-line.service';
import { InvoiceLinesResponse, InvoiceLine } from '~types/invoice-line'

type InvoiceLineParams = { invoice_id?: string, page?: number, limit?: number };

export const useGetInvoiceLinesByInvoiceIdMutation = () => {
    return useMutation<InvoiceLinesResponse, AxiosError, InvoiceLineParams>({
        mutationKey: ['get-invoice-lines'],
        mutationFn: (params?: InvoiceLineParams) => getInvoiceLinesByInvoiceId(params),
    });
};

export const useAssignAccountCode = () => {
    return useMutation<InvoiceLine, AxiosError, { id: string; account_plan_id: string; }>({
        mutationKey: ['assign-account-code'],
        mutationFn: ({ id, account_plan_id }: { id: string; account_plan_id: string; }) => assignAccountCode(id, account_plan_id),
    });
};
