interface GetProductsParams {
    page?: number;
    itemsPerPage?: number;
    translationsName?: string;
    orderCode?: string;
    orderCreatedAt?: string;
    productTaxonsTaxonCode?: string | string[];
    orderPrice?: string;
    orderTranslationName?: string;
    localeCode?: string;
    taxon?: string;
    acceptLanguage?: string;
}

export { GetProductsParams };
