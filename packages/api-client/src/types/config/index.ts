import { AxiosRequestConfig } from "axios";
import { TODO } from "..";

/**
 * Settings to be provided in the `middleware.config.js` file.
 */
export interface MiddlewareConfig {
    // Add the fields provided in the `middleware.config.js` file.
    api: AxiosRequestConfig;
}
