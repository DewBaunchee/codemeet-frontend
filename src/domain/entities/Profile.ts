import {Photo} from "./Photo";
import {Language} from "./Language";
import {ProgrammingLanguage} from "./ProgrammingLanguage";
import {Interest} from "./Interest";

export interface Profile {

    id: number;

    name: string;

    mainPhoto: Photo;

    photos: Photo[];

    interests: Interest[];

    languages: Language[];

    programmingLanguages: ProgrammingLanguage[];

}