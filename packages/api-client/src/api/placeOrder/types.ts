import { Address } from "src/types/models/Client";

interface PlaceOrderParams {
    orderTokenValue: string;
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
}

export { PlaceOrderParams, Address };
