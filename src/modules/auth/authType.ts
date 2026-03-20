export type registrationForm = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
};
export type TouchedFields = {
  first_name?: boolean;
  last_name?: boolean;
  email?: boolean;
  phone?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  address?: boolean;
  city?: boolean;
  state?: boolean;
  pincode?: boolean;
};

export type LoginFormErrors = {
  login?: string;
  password?: string;
};

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type LoginPayload = {
  login: string;
  password: string;
};

export type OtpPayload = {
  otp: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};
