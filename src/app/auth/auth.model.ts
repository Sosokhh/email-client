export interface SignupCredentials {
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

export interface SignupResponse {
  username: string;
}
