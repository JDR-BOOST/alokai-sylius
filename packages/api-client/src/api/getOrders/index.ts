import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Order } from "../../types/models/Order";

export const getOrders = async (
    context: BoilerplateIntegrationContext
): Promise<Order[]> => {
    consola.log("getOrders has been called");

    try {
        const response = await context.client.get<Order[]>("/orders");
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch orders:", error);
        throw error;
    }
};
