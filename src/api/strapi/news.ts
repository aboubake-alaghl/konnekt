
import StrapiQuery from "@/interfaces/StrapiQuery";
import _Request from "./_Request";
import strapiQueryToString from "@/utils/strapiQueryToString";

const ROUTE_NAME = "news";
export const indexNews = <T>(query?: StrapiQuery) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}${strapiQueryToString(query)}`

    });
};

export const indexSingleNews = <T>(id: string, query?: StrapiQuery) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${id}${strapiQueryToString(query)}`
    });
};


export const getMainNews = <T>(query?: StrapiQuery) => {
    return _Request<T>({
        method: "GET",
        route: `${'main-new'}${strapiQueryToString(query)}`
    });
};