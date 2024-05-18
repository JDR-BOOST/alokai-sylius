interface ShippingMethod {
    id: number;
    code: string;
    name: string;
    description: string;
    calculator: {
        type: string;
        configuration: any;
    };
}

export { ShippingMethod };
