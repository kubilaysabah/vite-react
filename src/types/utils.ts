import type { Response } from './response';

export type GetActivitiesParams = {
  page?: number;
  limit?: number;
}

export type Activity = {
  id: string;
  name: string;
  code: string;
}

export type ActivitiesResponse = Response<Activity>;