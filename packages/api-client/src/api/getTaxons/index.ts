import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Taxon } from "../../types/models/Taxon";

export const getTaxons = async (
    context: BoilerplateIntegrationContext
): Promise<Taxon[]> => {
    consola.log("getTaxons has been called");

    try {
        const response = await context.client.get<Taxon[]>("/taxons");
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch taxons:", error);
        throw error;
    }
};
