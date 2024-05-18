import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { UpdateCartItemQuantityParams } from "./types";
import { Cart } from "../../types/models/Cart";

export const updateCartItemQuantity = async (
    context: BoilerplateIntegrationContext,
    params: UpdateCartItemQuantityParams
): Promise<Cart> => {
    consola.log("updateCartItemQuantity has been called");

    try {
        const response = await context.client.patch<Cart>(
            `/orders/${params.orderTokenValue}/items/${params.itemId}`,
            {
                quantity: params.quantity,
            }
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to update cart item quantity:", error);
        throw error;
    }
};
