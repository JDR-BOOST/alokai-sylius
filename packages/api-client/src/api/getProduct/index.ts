import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetProductParams } from "./types";
import { Product } from "src/types/models/Product";
import { SfProduct } from "@vue-storefront/unified-data-model";

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
        const response = await context.client.get<Product>(url, { headers });
        consola.info("Product fetched successfully:", response.data);
        // Convert prodcut to SF model
        const sfProduct: SfProduct = {
            id: response.data.code,
            name: response.data.name,
            slug: response.data.slug,
            description: response.data.description,
            sku: response.data.code,
            price: response.data.variants[0].,
            images: response.data.images,
            categories: response.data.productTaxons,
            attributes: response.data.attributes,
            options: response.data.options,
            variants: response.data.variants,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
        };

        return response.data;
    } catch (error) {
        consola.error("Failed to fetch product:", error);
        throw error;
    }
};
