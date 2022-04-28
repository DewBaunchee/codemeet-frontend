import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

const unwrap = <R>(response: AxiosResponse<R>): R => response.data;

export const httpClient = {

    get: <R>(url: string, config?: AxiosRequestConfig): Observable<R> => {
        return from(axios.get(url, config)).pipe(map(unwrap));
    },

    post: <R>(url: string, data: any, config?: AxiosRequestConfig): Observable<R> => {
        return from(axios.post(url, data, config)).pipe(map(unwrap));
    }
}