/* tslint:disable */
/* eslint-disable */
/**
 * manager API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @enum {string}
 */

export const ManagedResourceStatus = {
    Accepted: 'ACCEPTED',
    Deleted: 'DELETED',
    Deleting: 'DELETING',
    Deprovision: 'DEPROVISION',
    Failed: 'FAILED',
    Provisioning: 'PROVISIONING',
    Ready: 'READY'
} as const;

export type ManagedResourceStatus = typeof ManagedResourceStatus[keyof typeof ManagedResourceStatus];



