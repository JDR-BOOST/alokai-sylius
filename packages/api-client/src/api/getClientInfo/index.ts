import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { ClientInfo } from "../../types/models/Client";

export const getClientInfo = async (
    context: BoilerplateIntegrationContext
): Promise<ClientInfo> => {
    consola.log("getClientInfo has been called");

    try {
        const response = await context.client.get<ClientInfo>("/me");
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch client info:", error);
        throw error;
    }
};
