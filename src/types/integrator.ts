import { Response } from './response';

export type GetIntegratorsParams = { page?: number; limit?: number }

export type Integrator = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  integration_code: number;
}

export type IntegratorsResponse = Response<Integrator>