import { BuySubscriptionInterface } from "@/interfaces/BuySubscriptionInterface";
import _Request from "./_Request";

const ROUTE_NAME = 'order'

export const addCard = <T>(data: { tok_id: string }) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'add_card'}/`,
        data
    });
};

export const buyDevice = <T>(data: BuyDeviceInterface) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'buy_device'}/`,
        data
    });
};

export const buyDeviceCrypto = <T>(data: BuyDeviceInterfaceCrypto) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'buy_device_crypto'}/`,
        data
    });
};

export const buySubscribe = <T>(data: BuySubscriptionInterface) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'subscribe'}/`,
        data
    });
};