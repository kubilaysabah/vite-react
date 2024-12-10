const integrationRoutes: { [key: number]: (tax_payer_id: string) => string } = {
  4: (tax_payer_id: string) => `uyumsoft/${tax_payer_id}`
};

export default integrationRoutes;