import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetProductParams } from "./types";

export const getProduct = async (
    context: BoilerplateIntegrationContext,
    params: GetProductParams
) => {
    if (!params.slug && !params.code) {
        consola.error("getProduct requires a slug or code.");
        throw new Error(
            "A 'slug' or 'code' parameter is required to fetch a product."
        );
    }

    const url = params.slug
        ? `/products-by-slug/${encodeURIComponent(params.slug)}`
        : `/products/${encodeURIComponent(params.code)}`;

    const headers = {
        "Accept-Language": params.acceptLanguage || "en_US", // Default to English if not specified
    };

    consola.log(`getProduct has been called for ${url}`);

    try {
        const response = await context.client.get(url, { headers });
        consola.info("Product fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch product:", error);
        throw error;
    }
};
