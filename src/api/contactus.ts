import _Request from "./_Request";

const ROUTE_NAME = 'contact-us'

export interface ContactUsBodyInterface {
    name: string;
    email: string;
    subject: string;
    message: string;
    recaptchaToken: string;
    department: "general" | "support" | "sales" | "ambassador" | "partners" | "marketing" | "legal";
}

export const postContactUs = <T>(data: ContactUsBodyInterface) => {
    return _Request<T>({
        method: "POST",
        route: `${ROUTE_NAME}/`,
        data
    });
};