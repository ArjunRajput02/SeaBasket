export type registrationForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
};
export type TouchedFields = {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  mobile?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  address?: boolean;
  city?: boolean;
  state?: boolean;
  pincode?: boolean;
};

