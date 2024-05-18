import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetOrderDetailsParams } from "./types";
import { Order } from "../../types/models/Order";

export const getOrderDetails = async (
    context: BoilerplateIntegrationContext,
    params: GetOrderDetailsParams
): Promise<Order> => {
    consola.log("getOrderDetails has been called");

    try {
        const response = await context.client.get<Order>(
            `/orders/${params.orderTokenValue}`
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch order details:", error);
        throw error;
    }
};
