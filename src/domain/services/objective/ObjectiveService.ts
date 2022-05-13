import {Observable} from "rxjs";
import {Objective} from "../../entities/Objective";
import {httpClient} from "../../../tools/http-client";
import {SolvedObjective} from "../../entities/SolvedObjective";

const prefix = "objective";

export const ObjectiveService = {

    get(id: number): Observable<Objective> {
        return httpClient.get<Objective>(`${prefix}`, {params: {id}})
    },

    getAll(): Observable<Objective[]> {
        return httpClient.get<Objective[]>(`${prefix}/list`);
    },

    getLastSolving(): Observable<number> {
        return httpClient.get<number>(`${prefix}/last-solving`);
    },

    getSolved(id: number, programmingLanguage: string): Observable<SolvedObjective> {
        return httpClient.post<SolvedObjective>(`${prefix}/solved`, {id, programmingLanguage});
    },

    save(objectiveId: number,
         programmingLanguage: string,
         code: string,
         solved: boolean): Observable<void> {
        return httpClient.post<void>(
            `${prefix}/save`,
            {objectiveId, programmingLanguage, code, solved}
        );
    },

}