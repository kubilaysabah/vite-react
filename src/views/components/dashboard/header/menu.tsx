import { type ReactNode } from 'react';
import { Dashboard, Group, Receipt, IntegrationInstructions, ShoppingBasket, Home } from '@mui/icons-material';
import pageRoutes from '@constant/page-routes.ts';

export type Menu = {
    id: string;
    url: string;
    title: string;
    icon: ReactNode;
};

const menu: Menu[] = [
    {
        id: 'home',
        title: 'Ana Sayfa',
        url: pageRoutes.home,
        icon: <Home />
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        url: pageRoutes.dashboard,
        icon: <Dashboard />
    },
    {
        id: 'invoice',
        title: 'Faturalar',
        icon: <Receipt />,
        url: pageRoutes.invoices,
    },
    {
        id: 'tax-payer',
        title: 'Mükellefler',
        icon: <Group />,
        url: pageRoutes.taxPayer.list,
    },
    {
        id: 'integrator',
        title: 'Entegrasyonlar',
        icon: <IntegrationInstructions />,
        url: pageRoutes.integrator.list,
    },
    {
        id: 'checkout',
        title: 'Sepet',
        icon: <ShoppingBasket />,
        url: pageRoutes.checkout,
    },
];

export default menu;
