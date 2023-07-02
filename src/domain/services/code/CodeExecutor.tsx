import {httpClient} from "../../../tools/http-client";
import {map} from "rxjs/operators";
import {io} from "socket.io-client";
import {Observable} from "rxjs";
import {Terminal} from "../../terminal/Terminal";

const url = "ws://localhost:10800";

const prefix = "code";

export const CodeExecutor = {

    execute: (language: string, code: string): Observable<Terminal> => {
        return httpClient.post<string>(`${prefix}/execute`, {language, code})
            .pipe(
                map((namespace) => {
                    return Terminal.listen(io(`${url}/${namespace}`, {transports: ["websocket"], reconnectionAttempts: 5}));
                })
            );
    },

}