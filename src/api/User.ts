import SignUpInterface from "@/interfaces/SignUpInterface";
import _Request from "./_Request";
// import UserProfileInterface from "@/interfaces/UserProfileInterface";
interface UserUpdateObject {
    first_name?: string,
    last_name?: string,
    profile: {
        address?: string | null,
        city?: string | null,
        country?: string | null,
        zipcode?: number | null,
        citizenship?: string | null,
        phone?: string | null
    }
};

const ROUTE_NAME = 'auth'

export const signIn = <T>(data: {
    email: string;
    password: string;
}) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'login'}/`,
        data: {
            ...data,
            is_web: true
        }
    });
};

export const signOut = <T>() => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'logout'}/`
    });
};

export const signUp = <T>(data: SignUpInterface) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/${'registration'}/`,
        data
    });
};

export const me = <T>() => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${'user'}/`
    });
};

export const updateProfile = <T>(data: UserUpdateObject) => {
    return _Request<T>({
        method: "PUT",
        data,
        route: `${ROUTE_NAME}/${'user'}/`
    });
};

export const changePassword = <T>(data: {
    new_password1: string;
    new_password2: string;
    old_password: string;
}) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/password/change/`
    });
};

export const resetPassword = <T>(data: { email: string }) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/password/reset/`
    });
};

export const confirmResetPassword = <T>(data: { new_password1: string, new_password2: string, uid: string, token: string }) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/password/reset/confirm/`
    });
};

export const verifyEmail = <T>(data: { key: string }) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/registration/verify-email/`
    });
};

export const resendEmail = <T>(data: { email: string }) => {
    return _Request<T>({
        method: "POST",
        data,
        route: `${ROUTE_NAME}/registration/resend-email/`
    });
};

export const deleteAccount = <T>() => {
    return _Request<T>({
        method: "DELETE",
        route: `${ROUTE_NAME}/user/`
    });
};