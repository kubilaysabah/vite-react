import { GetActivitiesParams } from '~types/utils.ts';

export const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL || 'http://localhost:3008/';
import { serializeParams } from '@utils/request';
import type { GetTaxPayersByUserIdParams } from '~types/tax-payer.ts';
import type { GetAccountPlansByTaxPayerIdParams } from '~types/account-plan.ts';
import type { GetInvoiceParams } from '~types/invoice';
import type { GetVouchersParams } from '~types/voucher';
import { GetInvoiceLinesByInvoiceIdParams } from '~types/invoice-line.ts';

const ApiRoutes = {
    auth: {
        login: `${BASE_URL}auth/login`,
        register: `${BASE_URL}auth/register`
    },
    user: {
        taxPayerCount: (id: string) => `${BASE_URL}user/${id}/count/tax-payer`,
        invoiceCount: (id: string) => `${BASE_URL}user/${id}/count/invoice`,
        voucherCount: (id: string) => `${BASE_URL}user/${id}/count/voucher`,
        remainingCredit: (id: string) => `${BASE_URL}user/${id}/count/credit`,
    },
    payment: `${BASE_URL}payment`,
    integrator: {
        list: (queryParams?: { page?: number; limit?: number; }) => {
            const serializeQueryParams = serializeParams(queryParams);
            return `${BASE_URL}integrator?${serializeQueryParams}`;
        },
        create: `${BASE_URL}integrator`,
        update: (id: string) => `${BASE_URL}integrator/${id}`,
        detail: (id: string) => `${BASE_URL}integrator/${id}`,
        delete: (id: string) => `${BASE_URL}integrator/${id}`
    },
    taxPayer: {
        list: (queryParams?: GetTaxPayersByUserIdParams) => {
            const serializeQueryParams = serializeParams(queryParams);
            return `${BASE_URL}tax-payer?${serializeQueryParams}`;
        },
        find: (id: string) => {
            return `${BASE_URL}tax-payer/${id}`;
        },
        create: `${BASE_URL}tax-payer`,
        update: (id: string) => {
            return `${BASE_URL}tax-payer/${id}`;
        },
        delete: (id: string) => {
            return `${BASE_URL}tax-payer/${id}`;
        },
        matchInvoices: (id: string): string => {
            return `${BASE_URL}tax-payer/match-invoices/${id}`
        },
        matchInvoiceLines: (id: string): string => {
            return `${BASE_URL}tax-payer/match-invoice-lines/${id}`
        }
    },
    invoice: {
        list: (queryParams?: GetInvoiceParams) => {
            const serializeQueryParams = serializeParams(queryParams);

            return `${BASE_URL}invoice?${serializeQueryParams}`;
        },
        assignAccountCode: (id: string) => `${BASE_URL}invoice/account-code/${id}`,
    },
    invoiceLine: {
        list: (queryParams?: GetInvoiceLinesByInvoiceIdParams) => {
            const serializeQueryParams = serializeParams(queryParams);

            return `${BASE_URL}invoice-line?${serializeQueryParams}`;
        },
        assignAccountCode: (id: string) => `${BASE_URL}invoice-line/account-code/${id}`,
    },
    voucher: {
        list: (params: GetVouchersParams) => {
            const { tax_payer_id, ...query } = params;
            const serializeQueryParams = serializeParams(query);

            return `${BASE_URL}voucher/tax-payer/${tax_payer_id}?${serializeQueryParams}`;
        }
    },
    utils: {
        activity: {
            list: (queryParams?: GetActivitiesParams) => {
                const serializeQueryParams = serializeParams(queryParams);

                return `${BASE_URL}utils/activities?${serializeQueryParams}`;
            }
        }
    },
    accountPlan: {
        upload: `${BASE_URL}account-plan/upload`,
        findByTaxPayerId: (tax_payer_id: string, queryParams: Omit<GetAccountPlansByTaxPayerIdParams, 'tax_payer_id'>) => {
            const serializeQueryParams = serializeParams(queryParams);
            return `${BASE_URL}account-plan/${tax_payer_id}?${serializeQueryParams}`;
        },
        accountCodes: (tax_payer_id: string) => {
            return `${BASE_URL}account-plan/account-codes/${tax_payer_id}`;
        },
        createAccountCode: (tax_payer_id: string) => `${BASE_URL}account-plan/account-code/${tax_payer_id}`,
        updateAccountCode: (tax_payer_id: string) => `${BASE_URL}account-plan/account-code/${tax_payer_id}`,
        deleteAccountPlan: (id: string) => `${BASE_URL}account-plan/${id}`,
    }
};

export default ApiRoutes;
