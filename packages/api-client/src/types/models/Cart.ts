interface Cart {
    tokenValue: string;
    items: CartItem[];
    total: number;
    state: string;
}

interface CartItem {
    id: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export { Cart, CartItem };
