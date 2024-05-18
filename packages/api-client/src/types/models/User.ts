interface User {
    id: number;
    email: string;
    roles: string[];
    enabled: boolean;
}

interface AuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string | null;
    refresh_token: string;
}

export { User, AuthResponse };
