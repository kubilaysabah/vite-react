export type TaxPayerCountParams = {
  id: string;
  start_date?: string; // ISO8601 string
  end_date?: string; // ISO8601 string
}

export type InvoiceCountParams = {
  id: string;
  start_date?: string; // ISO8601 string
  end_date?: string; // ISO8601 string
  type?: number; // 1: incoming, 2: outgoing
}

export type VoucherCountParams = {
  id: string;
  start_date?: string; // ISO8601 string
  end_date?: string; // ISO8601 string
}