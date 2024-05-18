import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Cart } from "../../types/models/Cart";

export const createCart = async (
    context: BoilerplateIntegrationContext
): Promise<Cart> => {
    consola.log("createCart has been called");

    try {
        const response = await context.client.post<Cart>("/orders");
        return response.data;
    } catch (error) {
        consola.error("Failed to create cart:", error);
        throw error;
    }
};
