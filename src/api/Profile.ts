import _Request from "./_Request";

const ROUTE_NAME = 'profile'

export const currentSubscription = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'my_subscription'}/`
    });
};

export const getMyTokens = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'my_token'}/`
    });
};

export const getMyCards = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'my_cards'}/`
    });
};

export const setDefaultCard = <T>(id: string) => {
    return _Request<T>({
        method: "PUT",
        data: {
            "default": true
        },
        route: `${ROUTE_NAME}/${'my_cards'}/${id}/`
    });
};

export const getMyReferralUsers = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'my_referred_user'}/`
    });
};

export const getMiningSpeed = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'my_bandwidth'}/`
    });
};

export interface PostSwapDataObject {
    destination_address: string;
    amount: string;
};

export const postSwapRequest = <T>(data: PostSwapDataObject) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/${'swap_request'}/`
    });
};

// https://admin.konnektvpn.app/api/profile/my_token/?page=1