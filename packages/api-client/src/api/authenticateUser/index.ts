import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { AuthenticateUserParams, AuthResponse } from "./types";

export const authenticateUser = async (
    context: BoilerplateIntegrationContext,
    params: AuthenticateUserParams
): Promise<AuthResponse> => {
    consola.log("authenticateUser has been called");

    try {
        const response = await context.client.post<AuthResponse>(
            "/oauth/v2/token",
            {
                email: params.email,
                password: params.password,
            }
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to authenticate user:", error);
        throw error;
    }
};
