export type PaymentParams = {
  user_id: string;
  price: string; // Decimal
  errorURL: string;
  successURL: string;
  content: string;
  description: string;
}

export type PaymentResponse = {
  statusCode: string;
  resultCode: string;
  resultMessage: string;
  redirectUrl: string;
}