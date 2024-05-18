import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { PlaceOrderParams } from "./types";
import { Order } from "../../types/models/Order";

export const placeOrder = async (
    context: BoilerplateIntegrationContext,
    params: PlaceOrderParams
): Promise<Order> => {
    consola.log("placeOrder has been called");

    try {
        const response = await context.client.post<Order>("/orders", params);
        return response.data;
    } catch (error) {
        consola.error("Failed to place order:", error);
        throw error;
    }
};
