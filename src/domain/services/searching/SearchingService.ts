import {SearchingCoincidence} from "../../entities/SearchingCoincidence";
import {httpClient} from "../../../tools/http-client";
import {Observable} from "rxjs";

const prefix = "searching";

export const SearchingService = {

    next(): Observable<SearchingCoincidence> {
        return httpClient.get<SearchingCoincidence>(`${prefix}/next`);
    },

}