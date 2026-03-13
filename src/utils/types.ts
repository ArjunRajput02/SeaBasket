export type FormErrorProps = {
  message?: string;
};
export type AuthState = {
  token: string | null;
  sessionToken: string | null;
}
export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};