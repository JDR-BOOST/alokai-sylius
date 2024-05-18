interface AuthenticateUserParams {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
}

interface AuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string | null;
    refresh_token: string;
}

export { AuthenticateUserParams, AuthResponse };
