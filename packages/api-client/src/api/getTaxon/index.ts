import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { Taxon } from "../../types/models/Taxon";
import { SfCategory } from "@vue-storefront/unified-data-model";

// Helper function to convert Taxon to SfCategory
const convertToSfCategory = (taxon: Taxon): SfCategory => {
    return {
        id: taxon.id ? taxon.id.toString() : "",
        name: taxon.name || "",
        slug: taxon.slug || "",
        subcategories: taxon.children
            ? taxon.children.map((child) => convertToSfCategory(child))
            : null,
        parentCategoryId: null, // Assuming parentCategoryId is null for the root categories
        $custom: {
            description: taxon.description || "",
            images: taxon.images || [],
        },
    };
};

// Function to get a single taxon by code and convert to SfCategory
export const getTaxon = async (
    context: BoilerplateIntegrationContext,
    code: string
): Promise<SfCategory> => {
    consola.log(`getTaxon has been called with code: ${code}`);

    try {
        const response = await context.client.get<Taxon>(`/taxons/${code}`);
        const taxon = response.data;
        const category = convertToSfCategory(taxon);
        return category;
    } catch (error) {
        consola.error(`Failed to fetch taxon with code ${code}:`, error);
        throw error;
    }
};
