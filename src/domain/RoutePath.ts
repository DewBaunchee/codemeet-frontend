export enum RoutePath {
    MAIN = "/",
    SOLVING = "/solving",
    SEARCHING = "/searching",
    LOGIN = "/login",
    REGISTRATION = "/registration",
}

export const NotAuthenticatedRoutes: RoutePath[] = [
    RoutePath.LOGIN,
    RoutePath.REGISTRATION,
];