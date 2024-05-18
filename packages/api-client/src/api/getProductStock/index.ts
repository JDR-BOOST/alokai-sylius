import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Stock } from "../../types/models/Product";
import { GetProductStockParams } from "./types";

export const getProductStock = async (
    context: BoilerplateIntegrationContext,
    params: GetProductStockParams
): Promise<Stock> => {
    consola.log("getProductStock has been called");

    try {
        const response = await context.client.get<Stock>(
            `/product-variants/${params.code}`
        );
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch product stock:", error);
        throw error;
    }
};
