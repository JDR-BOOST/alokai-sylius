interface ClientInfo {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    phoneNumber?: string;
    addresses: Address[];
}

interface Address {
    id: number;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postcode: string;
    countryCode: string;
}

export { ClientInfo, Address };
