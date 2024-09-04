import _DefaultHeaders from '@/utils/_DefaultHeaders';
import axiosInstance from '@/utils/axios';
import { RawAxiosRequestHeaders } from 'axios';
// route: string, method: string, data?: any, pathParam?: string | number, headers?: RawAxiosRequestHeaders, params?: any
const _Request = <T>({ data, headers = {}, method, params, pathParam, route }: {
    route: string
    method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
    data?: any
    pathParam?: string | number
    headers?: RawAxiosRequestHeaders
    params?: any
}) => {
    return axiosInstance<T>(`/${route}${pathParam ? "/" + pathParam : ""}`, {
        method,
        data,
        headers: { ...headers, ..._DefaultHeaders },
        params
    })
};

export default _Request;