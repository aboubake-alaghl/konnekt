import _Request from "./_Request";

const ROUTE_NAME = 'coupon'

export const checkCodeValidation = <T>(code: string) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'validation'}/`,
        data: {
            code
        }
    });
};