import {Observable} from "rxjs";
import {Interest} from "../../entities/Interest";
import {httpClient} from "../../../tools/http-client";
import {Language} from "../../entities/Language";
import {ProgrammingLanguage} from "../../entities/ProgrammingLanguage";
import {Sex} from "../../entities/Sex";

const prefix = "domain";

export const DomainService = {

    getInterests(): Observable<Interest[]> {
        return httpClient.get(`${prefix}/interests`);
    },

    getLanguages(): Observable<Language[]> {
        return httpClient.get(`${prefix}/languages`);
    },

    getProgrammingLanguages(): Observable<ProgrammingLanguage[]> {
        return httpClient.get(`${prefix}/programming-languages`);
    },

    getSexOptions(): Observable<Sex[]> {
        return httpClient.get(`${prefix}/sex-options`);
    },
};