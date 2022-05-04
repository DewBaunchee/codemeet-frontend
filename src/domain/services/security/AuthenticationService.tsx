import {httpClient} from "../../../tools/http-client";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {isBlank} from "../../../tools/util-functions";
import jwtDecode from "jwt-decode";

const PREFIX = "auth";
const TOKEN_KEY = "token";

export interface TokenPair {
    readonly access_token: string;
    readonly refresh_token: string;
}

export const AuthenticationService = {

    login: (phone: string, password: string) => httpClient.post<TokenPair>(`${PREFIX}/login`, null, {
        params: {
            username: phone,
            password
        }
    }).pipe(tap((token: TokenPair) => localStorage.setItem(TOKEN_KEY, JSON.stringify(token)))),

    logout() {
        localStorage.removeItem(TOKEN_KEY);
    },

    isAuthenticated: (): boolean => {
        const tokens: TokenPair = JSON.parse(localStorage.getItem(TOKEN_KEY)!);
        if (isBlank(tokens?.access_token)) return false;

        const decoded = jwtDecode<{ exp: number }>(tokens.access_token);
        const currentTime = new Date().getTime() / 1000;
        return currentTime < decoded.exp;
    },

    registration: (phoneNumber: string, password: string, name: string): Observable<string> =>
        httpClient.get<string>(`${PREFIX}/salt`).pipe(
            switchMap((salt: string) =>
                httpClient.post<string>(
                    `${PREFIX}/registration`,
                    {phoneNumber, password, name, salt}
                )
            )
        ),
}