const pageRoutes = {
    home: '/',
    dashboard: '/dashboard',
    auth: {
        login: '/login',
        register: '/register'
    },
    integrator: {
        list: `/integrator/list`,
        create: `/integrator/create`,
        edit: (id: string) => `/integrator/edit/${id}`,
        delete: (id: string) => `/integrator/delete/${id}`
    },
    checkout: `/checkout`,
    invoices: `/invoices`,
    taxPayer: {
        list: '/tax-payer/list',
        create: `/tax-payer/create`,
        edit: (id: string) => `/tax-payer/edit/${id}`,
        delete: (id: string) => `/tax-payer/delete/${id}`,
        accountPlan: (id: string) => `/tax-payer/${id}/account-plan`,
        vouchers: (id: string) => {
            return `/tax-payer/${id}/vouchers`
        }
    }
};

export default pageRoutes;
