export type Session = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  credit: number;
  phone: string;
}

export type LoginParams = {
  email: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
}

export type RegisterParams = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
}