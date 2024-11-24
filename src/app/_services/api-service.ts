
import { IPayload, PayloadMapper } from '../common/Payload';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageTypes } from '../common/alerts';
import { Helpers } from '../_helpers';

export interface IBaseService {
    service: <T>(cb: Observable<{}>) => Observable<any>;
    get: <T>(endPoint: string, params?: any) => Observable<any>;
    post: <T>(endPoint: string, model?: any) => Observable<any>;
    put: <T>(endPoint: string, model?: any) => Observable<any>;
    delete: <T>(endPoint: string) => Observable<any>;
}

interface IProcessPayloadOptions<T> {
    messageTypeIds?: string[];
}

export abstract class BaseService implements IBaseService {

    constructor(protected httpClient: HttpClient) { }


    processPayload<T>(payload: IPayload<T>, messageTypeIds?: string[]) {
        const message = payload.message || undefined;
        messageTypeIds = messageTypeIds || [MessageTypes.error, MessageTypes.failure];
        const messageTypeId = messageTypeIds.find(o => o === message?.messageTypeId);
       if (messageTypeId) {
           
            return (payload.message);
        } else {
           
            return (payload);
        }
    }

    service<T>(cb: Observable<{}>): Observable<IPayload<T>> {
       
        
        const onFulfilled = (value:any) => new PayloadMapper().fromObject<T>(value);
        const onRejection = (reason:any) => new PayloadMapper().fromObject<T>(reason);

        return cb.pipe(map(onFulfilled, onRejection));
    }

    /**
 * POST request
 * @param {string} endPoint end point of the api
 * @param {Object} params body of the request.
 * @param {IRequestOptions} options options of the request like headers, body, etc.
 * @returns {Observable<T>}
 */
    post<T>(endPoint:any, model?:any): Observable<T> {
      
        if (model)
            model = Helpers.trimObject(model);
            return this.httpClient.post<T>(endPoint, model)
    }

    /**
 * GET request
 * @param {string} endPoint it doesn't need / in front of the end point
 * @param {IRequestOptions} options options of the request like headers, body, etc.
 * @returns {Observable<T>}
 */
    get<T>(endPoint:any, params?:any): Observable<T> {
        if (params)
            return this.httpClient.get<T>(endPoint, { params: params })
        else
            return this.httpClient.get<T>(endPoint)
    }

     /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} model body of the request.
     * @returns {Observable<T>}
     */
     put<T>(endPoint: string, model?: any): Observable<T> {
        if (model) {
            model = Helpers.trimObject(model);
        }
        return this.httpClient.put<T>(endPoint, model);
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @returns {Observable<T>}
     */
    delete<T>(endPoint: string): Observable<T> {
        return this.httpClient.delete<T>(endPoint);
    }


}
