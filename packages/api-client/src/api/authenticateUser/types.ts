interface AuthenticateUserParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  customer: string;
}

export { AuthenticateUserParams, AuthResponse };
