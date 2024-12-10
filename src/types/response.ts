export type Response<T> = {
  data: T[];
  meta: {
    totalPages: number;
    count: number;
    page: number;
  }
}