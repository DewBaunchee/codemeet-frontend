import {Country} from "./Country";

export interface Language {

    key: string;

    label: string;

    country?: Country;

}