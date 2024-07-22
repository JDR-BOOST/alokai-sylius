interface Taxon {
    id: number;
    code: string;
    name: string;
    description: string;
    children: Taxon[];
    images: {
        id: number;
        type: string;
        path: string;
    }[];
    slug: string;
}

export { Taxon };
