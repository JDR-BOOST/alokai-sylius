import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Cart } from "../../types/models/Cart";
import { AddItemToCartParams } from "./types";

export const addItemToCart = async (
    context: BoilerplateIntegrationContext,
    params: AddItemToCartParams
): Promise<Cart> => {
    consola.log("addItemToCart has been called");

    try {
        const response = await context.client.patch<Cart>(
            `/orders/${params.orderTokenValue}/items`,
            {
                productVariant: `/product-variants/${params.productVariant}`,
                quantity: params.quantity,
            }
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to add item to cart:", error);
        throw error;
    }
};
