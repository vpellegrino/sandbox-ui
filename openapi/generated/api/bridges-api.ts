/* tslint:disable */
/* eslint-disable */
/**
 * Red Hat Openshift SmartEvents Fleet Manager
 * The API exposed by the fleet manager of the SmartEvents service.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: openbridge-dev@redhat.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { BridgeListResponse } from '../model';
// @ts-ignore
import { BridgeRequest } from '../model';
// @ts-ignore
import { BridgeResponse } from '../model';
// @ts-ignore
import { ErrorsList } from '../model';
// @ts-ignore
import { ManagedResourceStatus } from '../model';
/**
 * BridgesApi - axios parameter creator
 * @export
 */
export const BridgesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a Bridge instance for the authenticated user.
         * @summary Create a Bridge instance
         * @param {BridgeRequest} [bridgeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createBridge: async (bridgeRequest?: BridgeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/smartevents_mgmt/v1/bridges`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(bridgeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a Bridge instance of the authenticated user by ID.
         * @summary Delete a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBridge: async (bridgeId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bridgeId' is not null or undefined
            assertParamExists('deleteBridge', 'bridgeId', bridgeId)
            const localVarPath = `/api/smartevents_mgmt/v1/bridges/{bridgeId}`
                .replace(`{${"bridgeId"}}`, encodeURIComponent(String(bridgeId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a Bridge instance of the authenticated user by ID.
         * @summary Get a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBridge: async (bridgeId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bridgeId' is not null or undefined
            assertParamExists('getBridge', 'bridgeId', bridgeId)
            const localVarPath = `/api/smartevents_mgmt/v1/bridges/{bridgeId}`
                .replace(`{${"bridgeId"}}`, encodeURIComponent(String(bridgeId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the list of Bridge instances for the authenticated user.
         * @summary Get the list of Bridge instances
         * @param {string} [name] 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {Set<ManagedResourceStatus>} [status] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBridges: async (name?: string, page?: number, size?: number, status?: Set<ManagedResourceStatus>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/smartevents_mgmt/v1/bridges`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }

            if (status) {
                localVarQueryParameter['status'] = Array.from(status);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BridgesApi - functional programming interface
 * @export
 */
export const BridgesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BridgesApiAxiosParamCreator(configuration)
    return {
        /**
         * Create a Bridge instance for the authenticated user.
         * @summary Create a Bridge instance
         * @param {BridgeRequest} [bridgeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createBridge(bridgeRequest?: BridgeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BridgeResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createBridge(bridgeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete a Bridge instance of the authenticated user by ID.
         * @summary Delete a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteBridge(bridgeId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteBridge(bridgeId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get a Bridge instance of the authenticated user by ID.
         * @summary Get a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBridge(bridgeId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BridgeResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBridge(bridgeId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get the list of Bridge instances for the authenticated user.
         * @summary Get the list of Bridge instances
         * @param {string} [name] 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {Set<ManagedResourceStatus>} [status] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBridges(name?: string, page?: number, size?: number, status?: Set<ManagedResourceStatus>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BridgeListResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getBridges(name, page, size, status, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BridgesApi - factory interface
 * @export
 */
export const BridgesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BridgesApiFp(configuration)
    return {
        /**
         * Create a Bridge instance for the authenticated user.
         * @summary Create a Bridge instance
         * @param {BridgeRequest} [bridgeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createBridge(bridgeRequest?: BridgeRequest, options?: any): AxiosPromise<BridgeResponse> {
            return localVarFp.createBridge(bridgeRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a Bridge instance of the authenticated user by ID.
         * @summary Delete a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBridge(bridgeId: string, options?: any): AxiosPromise<void> {
            return localVarFp.deleteBridge(bridgeId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a Bridge instance of the authenticated user by ID.
         * @summary Get a Bridge instance
         * @param {string} bridgeId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBridge(bridgeId: string, options?: any): AxiosPromise<BridgeResponse> {
            return localVarFp.getBridge(bridgeId, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the list of Bridge instances for the authenticated user.
         * @summary Get the list of Bridge instances
         * @param {string} [name] 
         * @param {number} [page] 
         * @param {number} [size] 
         * @param {Set<ManagedResourceStatus>} [status] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBridges(name?: string, page?: number, size?: number, status?: Set<ManagedResourceStatus>, options?: any): AxiosPromise<BridgeListResponse> {
            return localVarFp.getBridges(name, page, size, status, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BridgesApi - interface
 * @export
 * @interface BridgesApi
 */
export interface BridgesApiInterface {
    /**
     * Create a Bridge instance for the authenticated user.
     * @summary Create a Bridge instance
     * @param {BridgeRequest} [bridgeRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApiInterface
     */
    createBridge(bridgeRequest?: BridgeRequest, options?: AxiosRequestConfig): AxiosPromise<BridgeResponse>;

    /**
     * Delete a Bridge instance of the authenticated user by ID.
     * @summary Delete a Bridge instance
     * @param {string} bridgeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApiInterface
     */
    deleteBridge(bridgeId: string, options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     * Get a Bridge instance of the authenticated user by ID.
     * @summary Get a Bridge instance
     * @param {string} bridgeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApiInterface
     */
    getBridge(bridgeId: string, options?: AxiosRequestConfig): AxiosPromise<BridgeResponse>;

    /**
     * Get the list of Bridge instances for the authenticated user.
     * @summary Get the list of Bridge instances
     * @param {string} [name] 
     * @param {number} [page] 
     * @param {number} [size] 
     * @param {Set<ManagedResourceStatus>} [status] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApiInterface
     */
    getBridges(name?: string, page?: number, size?: number, status?: Set<ManagedResourceStatus>, options?: AxiosRequestConfig): AxiosPromise<BridgeListResponse>;

}

/**
 * BridgesApi - object-oriented interface
 * @export
 * @class BridgesApi
 * @extends {BaseAPI}
 */
export class BridgesApi extends BaseAPI implements BridgesApiInterface {
    /**
     * Create a Bridge instance for the authenticated user.
     * @summary Create a Bridge instance
     * @param {BridgeRequest} [bridgeRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApi
     */
    public createBridge(bridgeRequest?: BridgeRequest, options?: AxiosRequestConfig) {
        return BridgesApiFp(this.configuration).createBridge(bridgeRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a Bridge instance of the authenticated user by ID.
     * @summary Delete a Bridge instance
     * @param {string} bridgeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApi
     */
    public deleteBridge(bridgeId: string, options?: AxiosRequestConfig) {
        return BridgesApiFp(this.configuration).deleteBridge(bridgeId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get a Bridge instance of the authenticated user by ID.
     * @summary Get a Bridge instance
     * @param {string} bridgeId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApi
     */
    public getBridge(bridgeId: string, options?: AxiosRequestConfig) {
        return BridgesApiFp(this.configuration).getBridge(bridgeId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the list of Bridge instances for the authenticated user.
     * @summary Get the list of Bridge instances
     * @param {string} [name] 
     * @param {number} [page] 
     * @param {number} [size] 
     * @param {Set<ManagedResourceStatus>} [status] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BridgesApi
     */
    public getBridges(name?: string, page?: number, size?: number, status?: Set<ManagedResourceStatus>, options?: AxiosRequestConfig) {
        return BridgesApiFp(this.configuration).getBridges(name, page, size, status, options).then((request) => request(this.axios, this.basePath));
    }
}
