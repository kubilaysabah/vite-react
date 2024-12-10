import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    async lazy() {
      const { default: Component } = await import('../views/layout/landing/root');
      return { Component };
    },
    children: [
      {
        index: true,
        id: 'home',
        path: '/',
        async lazy() {
          const { default: Component } = await import('../views/pages/landing/home');
          return { Component };
        }
      },
      {
        async lazy() {
          const { default: Component } = await import('./guards/not-authenticate-guard');
          return { Component };
        },
        children: [
          {
            async lazy() {
              const { default: Component } = await import('../views/layout/landing/authentication');
              return { Component };
            },
            children: [
              {
                index: true,
                id: 'login',
                path: '/login',
                async lazy() {
                  const { default: Component } = await import('@pages/landing/authentication/login');
                  return { Component };
                }
              },
              {
                id: 'register',
                path: '/register',
                async lazy() {
                  const { default: Component } = await import('@pages/landing/authentication/register');
                  return { Component };
                }
              }
            ]
          },
        ]
      },
    ]
  },
  {
    async lazy() {
      const { default: Component } = await import('./guards/authenticate-guard');
      return { Component };
    },
    children: [
      {
        async lazy() {
          const { default: Component } = await import('../views/layout/dashboard/root');
          return { Component };
        },
        children: [
          {
            index: true,
            id: 'dashboard',
            path: '/dashboard',
            async lazy() {
              const { default: Component } = await import('../views/pages/dashboard');
              return { Component };
            }
          },
          {
            id: 'checkout',
            path: '/checkout',
            async lazy() {
              const { default: Component } = await import('../views/pages/dashboard/checkout');
              return { Component };
            }
          },
          {
            path: '/tax-payer',
            children: [
              {
                index: true,
                path: 'list',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/tax-payer/list');
                  return { Component };
                }
              },
              {
                id: 'create-tax-payer',
                path: 'create',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/tax-payer/create');
                  return { Component };
                }
              },
              {
                id: 'edit-tax-payer',
                path: 'edit/:id',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/tax-payer/edit');
                  return { Component };
                }
              },
              {
                path: ':id/account-plan',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/tax-payer/account-plan');
                  return { Component };
                }
              },
              {
                id: 'vouchers',
                path: ':id/vouchers',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/tax-payer/[id]/vouchers');
                  return { Component };
                }
              }
            ]
          },
          {
            path: '/integrator',
            children: [
              {
                index: true,
                path: 'list',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/integrator/list');
                  return { Component };
                }
              },
              {
                path: 'create',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/integrator/create');
                  return { Component };
                }
              },
              {
                path: 'edit/:id',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/integrator/edit');
                  return { Component };
                }
              },
              {
                path: 'delete/:id',
                async lazy() {
                  const { default: Component } = await import('../views/pages/dashboard/integrator/delete');
                  return { Component };
                }
              }
            ]
          },
          {
            id: 'invoices',
            path: '/invoices',
            async lazy() {
              const { default: Component } = await import('../views/pages/dashboard/invoices');
              return { Component };
            }
          }
        ]
      }
    ]
  }
]);

export default router;
