interface Order {
    id: number;
    tokenValue: string;
    items: OrderItem[];
    total: number;
    state: string;
    createdAt: string;
}

interface OrderItem {
    id: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export { Order, OrderItem };
