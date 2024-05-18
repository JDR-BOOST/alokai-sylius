import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Order } from "../../types/models/Order";
import { CheckoutCartParams } from "./types";

export const checkoutCart = async (
    context: BoilerplateIntegrationContext,
    params: CheckoutCartParams
): Promise<Order> => {
    consola.log("checkoutCart has been called");

    try {
        const response = await context.client.patch<Order>(
            `/orders/${params.orderTokenValue}`,
            {
                state: "completed",
            }
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to checkout cart:", error);
        throw error;
    }
};
