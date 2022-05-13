import {Objective} from "./Objective";
import {ProgrammingLanguage} from "./ProgrammingLanguage";

export interface SolvedObjective {

    objective: Objective;

    programmingLanguage: ProgrammingLanguage;

    code: string;

    solved: boolean;

}