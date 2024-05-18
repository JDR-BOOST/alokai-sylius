import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { PaymentMethod } from "../../types/models/PaymentMethod";

export const getPaymentMethods = async (
    context: BoilerplateIntegrationContext
): Promise<PaymentMethod[]> => {
    consola.log("getPaymentMethods has been called");

    try {
        const response = await context.client.get<PaymentMethod[]>(
            "/payment-methods"
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch payment methods:", error);
        throw error;
    }
};
