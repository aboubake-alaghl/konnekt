
const ROUTE_NAME = 'jobs'
import _Request from "./_Request";

export const indexJobs = <T>({ params }: { params: any }) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}`,
        params
    });
};

export const getJob = <T>(id: string, params: any) => {
    return _Request<T>({
        method: "GET",
        route: `${ROUTE_NAME}/${id}`,
        params
    });
};