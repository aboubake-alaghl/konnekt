import _Request from "./_Request";

const ROUTE_NAME = 'history'

export const indexPurchase = <T>(params: { page: number }) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'purchase'}/`,
        params
    });
};