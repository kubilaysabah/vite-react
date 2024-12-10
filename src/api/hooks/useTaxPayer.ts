import { type AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTaxPayersByUserId, getTaxPayerById, updateTaxPayerById, deleteTaxPayerById, createTaxPayer, matchInvoices, matchInvoiceLines } from '@services/tax-payer.service';
import type { GetTaxPayersByUserIdParams, TaxPayer, TaxPayersResponse } from '~types/tax-payer';
import { useMessageStore } from '@state/toast.state';
import useSession from '@hooks/useSession';

export const useGetTaxPayersByUserId = (params: GetTaxPayersByUserIdParams) => {
    const session = useSession();

    return useQuery<TaxPayersResponse, AxiosError, TaxPayersResponse>({
        queryKey: ['get-tax-payers-by-user-id', params],
        queryFn: () => getTaxPayersByUserId({
            ...params,
            user_id: session?.id
        })
    });
};

export const useTaxPayersByUserId = () => {
    const session = useSession();

    return useMutation<TaxPayersResponse, AxiosError, GetTaxPayersByUserIdParams>({
        mutationKey: ['tax-payers-by-user-id'],
        mutationFn: (params: GetTaxPayersByUserIdParams) => getTaxPayersByUserId({
            ...params,
            user_id: session?.id
        })
    });
}

export const useTaxPayerById = () => {
    return useMutation<TaxPayer | null, AxiosError, string>({
        mutationKey: ['tax-payer-by-id'],
        mutationFn: (id: string) => getTaxPayerById(id),
    });
};

export const useCreateTaxPayer = () => {
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<TaxPayer, AxiosError, TaxPayer>({
        mutationKey: ['create-tax-payer'],
        mutationFn: (body: TaxPayer) => createTaxPayer(body),
        onSuccess: () => {
            showMessage({
                message: 'Mükellef başarıyla oluşturuldu',
                status: 'success'
            });
        },
        onError: (error) => {
            console.log(error);

            showMessage({
                message: 'Mükellef oluşturulurken bir hata oluştu',
                status: 'error'
            });
        }
    });
};

export const useUpdateTaxPayerById = () => {
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<TaxPayer, AxiosError, { id: string; body: TaxPayer }>({
        mutationKey: ['update-tax-payer-by-id'],
        mutationFn: ({ id, body }: { id: string; body: TaxPayer }) => updateTaxPayerById(id, body),
        onSuccess: () => {
            showMessage({
                message: 'Mükellef başarıyla güncellendi',
                status: 'success'
            });
        },
        onError: (error) => {
            console.log(error);

            showMessage({
                message: 'Mükellef güncellenirken bir hata oluştu',
                status: 'error'
            });
        }
    });
};

export const useDeleteTaxPayerById = () => {
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<TaxPayer, AxiosError, string>({
        mutationKey: ['delete-tax-payer-by-id'],
        mutationFn: (id: string) => deleteTaxPayerById(id),
        onSuccess: () => {
            showMessage({
                message: 'Mükellef başarıyla silindi',
                status: 'success'
            });
        },
        onError: (error) => {
            console.log(error);

            showMessage({
                message: 'Mükellef silinirken bir hata oluştu',
                status: 'error'
            });
        }
    });
};

export const useMatchInvoicesMutation = () => {
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<string, AxiosError, string>({
        mutationKey: ['match-invoices'],
        mutationFn: (id: string) => matchInvoices(id),
        onSuccess: () => {
            showMessage({
                message: 'Fatura eşleşmeleri başarıyla tamamlandı',
                status: 'success'
            });
        },
    })
}

export const useMatchInvoiceLinesMutation = () => {
    const showMessage = useMessageStore((state) => state.showMessage);

    return useMutation<string, AxiosError, string>({
        mutationKey: ['match-invoices'],
        mutationFn: (id: string) => matchInvoiceLines(id),
        onSuccess: () => {
            showMessage({
                message: 'Fatura satırları eşleşmeleri başarıyla tamamlandı',
                status: 'success'
            });
        },
    })
}