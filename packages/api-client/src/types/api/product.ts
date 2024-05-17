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
    variants: string[];
    options: string[];
    associations: string[];
    createdAt: string;
    updatedAt: string;
    shortDescription: string;
    reviews: any[]; // Aan te passen als er een specifiek type voor reviews is
    name: string;
    description: string;
    slug: string;
    defaultVariant: string;
}
