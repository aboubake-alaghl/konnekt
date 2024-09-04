import _Request from "./_Request";

const ROUTE_NAME = ''

export const getExchangeRate = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}${'exchange-rate'}/`
    });
};