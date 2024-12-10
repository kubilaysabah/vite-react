import type { Response } from './response.ts'
import type { Activity } from './utils.ts';
import type { Integrator } from './integrator.ts';

export type GetTaxPayersByUserIdParams = {
  page?: number;
  limit?: number;
  user_id?: string;
  integrator_id?: string;
}

export type TaxPayer = {
  id?: string;
  turkish_identity_number?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  tax_number?: string;
  tax_office?: string;
  tax_office_code?: string;
  trade_register_number?: string;
  central_registry_system_number?: string;
  opening_date?: string;
  closing_date?: string;
  registration_date?: string;
  registration_place?: string;
  tax_obligation?: boolean;
  subscribed_capital?: number;
  paid_capital?: number;
  ssi?: string;
  professional_organizations?: string;
  professional_organizations_number?: string;
  simple_entry?: boolean;
  integrator_username?: string;
  integrator_password?: string;
  integrator_client_secret?: string;
  integrator_client_id?: string;
  user_id?: string;
  integrator_id?: string;
  activity_id?: string;
  integrator?: Integrator;
  activity?: Activity;
}

export type CreateTaxPayerParams = Omit<TaxPayer, "activity" | "integrator" | "id">
export type UpdateTaxPayerParams = Omit<TaxPayer, "activity" | "integrator">

export type TaxPayersResponse = Response<TaxPayer>;