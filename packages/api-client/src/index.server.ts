import axios, { AxiosRequestConfig } from "axios";
import { apiClientFactory } from "@vue-storefront/middleware";
import { MiddlewareConfig } from "./index";
import * as apiEndpoints from "./api";

/**
 * In here you should create the client you'll use to communicate with the backend.
 * Axios is just an example.
 */
const buildClient = (settings: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        ...settings,
    });
    return axiosInstance;
};

const onCreate = (settings: MiddlewareConfig) => {
    const client = buildClient(settings.api);

    return {
        config: settings,
        client,
    };
};

const { createApiClient } = apiClientFactory<any, any>({
    onCreate,
    api: apiEndpoints,
});

export { createApiClient };
