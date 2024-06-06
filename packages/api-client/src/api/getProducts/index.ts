import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetProductsParams } from "./types";
import { Product, ProductVariant, Image } from "src/types/models/Product";
import {
    SfProduct,
    SfImage,
    SfProductVariant,
    SfDiscountablePrice,
    SfProductCatalogItem,
    SfPagination,
    SfFacet,
    Maybe,
    SfCategory,
} from "@vue-storefront/unified-data-model";

export const getProducts = async (
    context: BoilerplateIntegrationContext,
    params?: GetProductsParams
): Promise<{
    products: SfProductCatalogItem[];
    pagination: SfPagination;
    facets: SfFacet[];
    currentCategory: Maybe<SfCategory>;
    subCategories: SfCategory[];
    categoryHierarchy: SfCategory[];
}> => {
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

        const products = await Promise.all(
            response.data.map((product) =>
                mapToSfProductCatalogItem(product, context)
            )
        );

        // Placeholder for pagination, facets, and category hierarchy logic
        const pagination: SfPagination = {
            currentPage: config.params.page,
            pageSize: config.params.itemsPerPage,
            totalResults: response.data.length, // This should be replaced with the actual total from the API response if available
            totalPages: Math.ceil(
                response.data.length / config.params.itemsPerPage
            ),
            $custom: {},
        };

        const facets: SfFacet[] = []; // Placeholder for facets logic
        const currentCategory: Maybe<SfCategory> = null; // Placeholder for current category logic
        const subCategories: SfCategory[] = []; // Placeholder for subcategories logic
        const categoryHierarchy: SfCategory[] = []; // Placeholder for category hierarchy logic

        return {
            products,
            pagination,
            facets,
            currentCategory,
            subCategories,
            categoryHierarchy,
        };
    } catch (error) {
        consola.error("Failed to fetch products:", error);
        throw error;
    }
};

const mapToSfProductCatalogItem = async (
    product: Product,
    context: BoilerplateIntegrationContext
): Promise<SfProductCatalogItem> => {
    // Transform images to SfImage format
    const images: SfImage[] = product.images.map((image: Image) => ({
        alt: null,
        url: image.path,
    }));

    // Fetch and transform variants
    const variantPromises = product.variants.map((variantUrl) => {
        const modifiedUrl = variantUrl.replace("/api/v2/shop", "");
        return context.client
            .get<ProductVariant>(modifiedUrl)
            .catch((error) => {
                consola.error(`Failed to fetch variant: ${modifiedUrl}`, error);
                return null; // Return null if fetch fails
            });
    });
    const variantResponses = await Promise.all(variantPromises);
    const variants: SfProductVariant[] = variantResponses.map((response) => {
        const variant = response.data;
        return {
            id: variant.code,
            slug: variant.code,
            sku: variant.code,
            name: variant.name,
            quantityLimit: variant.inStock ? null : 0, // Assuming stock control
            attributes: [], // Map attributes if available
        };
    });

    // Assuming the price information should come from the default variant
    const modifiedUrl = product.defaultVariant.replace("/api/v2/shop", "");
    const defaultVariantResponse = await context.client.get<ProductVariant>(
        modifiedUrl
    );
    const defaultVariant = defaultVariantResponse.data;
    const price = {
        isDiscounted: defaultVariant.originalPrice > defaultVariant.price,
        regularPrice: {
            currency: "USD", // Placeholder, adjust as needed
            amount: defaultVariant.originalPrice, // Original price
            precisionAmount: defaultVariant.originalPrice.toString(), // Original price
        },
        value: {
            currency: "USD", // Placeholder, adjust as needed
            amount: defaultVariant.price, // Discounted price
            precisionAmount: defaultVariant.price.toString(), // Discounted price
        },
    };

    const sfProductCatalogItem: SfProductCatalogItem = {
        id: product.id.toString(),
        sku: product.code,
        name: product.name,
        slug: product.slug,
        // description: product.description,
        price: price,
        primaryImage: images[0] || null,
        // gallery: images,
        rating: {
            average: product.averageRating,
            count: product.reviews.length,
        },
        // variants: variants,
        // attributes: [], // Map attributes if available
        quantityLimit: null, // Assuming quantityLimit is not available
    };

    return sfProductCatalogItem;
};
