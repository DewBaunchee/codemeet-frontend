export enum RoutePath {
    MAIN = "/",
    LOGIN = "/login",
    REGISTRATION = "/registration",
}

export const NotAuthenticatedRoutes: RoutePath[] = [
    RoutePath.LOGIN,
    RoutePath.REGISTRATION,
];