export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  terms: boolean;
};

export type FormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  terms: string;
};

export type Field = {
  name: keyof FormData;
  label: string;
  placeholder: string;
  type: string;
};