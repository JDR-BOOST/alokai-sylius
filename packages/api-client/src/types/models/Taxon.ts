interface Taxon {
    id: number;
    code: string;
    name: string;
    description: string;
    children: Taxon[];
}

export { Taxon };
