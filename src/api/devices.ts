import _Request from "./_Request";

const ROUTE_NAME = 'device'

export const indexDevices = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'devices'}/`
    });
};

export const getDeviceBySlug = <T>(slug: string) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'devices'}/${slug}/`
    });
};

export const getMyDevices = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/my_devices/`
    });
};