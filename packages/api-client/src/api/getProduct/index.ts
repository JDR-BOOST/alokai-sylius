import consola from "consola";
import { BoilerplateIntegrationContext } from "../../types";
import { GetProductParams } from "./types";
import { Product, ProductVariant, Image } from "src/types/models/Product";
import {
  SfProduct,
  SfImage,
  SfProductVariant,
} from "@vue-storefront/unified-data-model";

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
    "Accept-Language": params.acceptLanguage || "en_US",
  };

  try {
    const response = await context.client.get<Product>(url, { headers });
    consola.info("Product fetched successfully:", response.data);

    const sfProduct = await mapToSfProduct(response.data, context);
    return sfProduct;
  } catch (error) {
    consola.error("Failed to fetch product:", error);
    throw error;
  }
};

const mapToSfProduct = async (
  product: Product,
  context: BoilerplateIntegrationContext
) => {
  // Transform images to SfImage format
  const images: SfImage[] = product.images.map((image: Image) => ({
    alt: null,
    url: image.path,
  }));

  //   Fetch and transform variants
  const variantPromises = product.variants.map((variantUrl) => {
    const modifiedUrl = variantUrl.replace("/api/v2/shop", "");
    consola.log(`Fetching variant: ${modifiedUrl}`);
    return context.client.get<ProductVariant>(modifiedUrl).catch((error) => {
      consola.error(`Failed to fetch variant: ${modifiedUrl}`, error);
      return null; // Return null if fetch fails
    });
  });
  const variantResponses = (await Promise.all(variantPromises)).filter(Boolean); // Filter out null responses
  consola.info("Variants fetched successfully:", variantResponses);

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
  const defaultVariantResponse = await context.client
    .get<ProductVariant>(modifiedUrl)
    .catch((error) => {
      consola.error(
        `Failed to fetch default variant: ${product.defaultVariant}`,
        error
      );
      throw error;
    });
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

  const sfProduct: SfProduct = {
    id: product.id.toString(),
    sku: product.code,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: price,
    primaryImage: images[0] || null,
    gallery: images,
    rating: {
      average: product.averageRating,
      count: product.reviews.length,
    },
    variants,
    attributes: [], // Map attributes if available
    quantityLimit: null, // Assuming quantityLimit is not available
  };

  return sfProduct;
};
