export interface SignupCredentials {
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

export interface SignupResponse {
  username: string;
}

export interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignInResponse {
  username: string;
}
