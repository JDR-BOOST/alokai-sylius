interface Image {
  id: number;
  type: string;
  path: string;
}

interface Product {
  productTaxons: string[];
  mainTaxon: string;
  averageRating: number;
  images: Image[];
  id: number;
  code: string;
  variants: string[]; // Array of variant URLs
  options: string[]; // Array of option URLs
  associations: string[]; // Array of association URLs
  createdAt: string;
  updatedAt: string;
  shortDescription: string;
  reviews: any[]; // To be updated with a specific type for reviews if available
  name: string;
  description: string;
  slug: string;
  defaultVariant: string; // URL to the default variant
}

interface ProductVariant {
  code: string;
  product: string; // URL to the product
  optionValues: string[]; // Array of option value URLs
  name: string;
  inStock: boolean;
  price: number;
  originalPrice: number;
  lowestPriceBeforeDiscount: number | null;
}

interface Stock {
  onHand: number;
  onHold: number;
}

export { Image, Product, ProductVariant, Stock };
