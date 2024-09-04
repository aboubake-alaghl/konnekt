import _Request from "./_Request";

const ROUTE_NAME = 'subscription'

export const indexSubscriptions = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/`
    });
};

export const getSubscription = <T>(id: string) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${id}/`
    });
};