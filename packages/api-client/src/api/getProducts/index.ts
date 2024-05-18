import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetProductsParams } from "./types";
import { Product } from "src/types/models/Product";

export const getProducts = async (
    context: BoilerplateIntegrationContext,
    params?: GetProductsParams
) => {
    consola.log("getProducts has been called");

    const config = {
        params: {
            page: params?.page || 1,
            itemsPerPage: params?.itemsPerPage || 30,
            "translations.name": params?.translationsName,
            "order[code]": params?.orderCode,
            "order[createdAt]": params?.orderCreatedAt,
            "productTaxons.taxon.code": Array.isArray(
                params?.productTaxonsTaxonCode
            )
                ? params?.productTaxonsTaxonCode.join(",")
                : params?.productTaxonsTaxonCode,
            "order[price]": params?.orderPrice,
            "order[translation.name]": params?.orderTranslationName,
            localeCode: params?.localeCode,
            taxon: params?.taxon,
        },
        headers: {
            "Accept-Language": params?.acceptLanguage || "en-US",
        },
    };

    // Remove undefined or empty parameters
    Object.keys(config.params).forEach(
        (key) =>
            (config.params[key] === undefined || config.params[key] === "") &&
            delete config.params[key]
    );

    try {
        const response = await context.client.get<Product[]>(
            "/products",
            config
        );
        consola.info("Products fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        consola.error("Failed to fetch products:", error);
        throw error;
    }
};
