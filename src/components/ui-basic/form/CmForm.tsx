import s from "./CmForm.module.css";
import {concatClasses} from "../../../tools/util-functions";
import {FormHTMLAttributes} from "react";

export const CmForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
    return (
        <form {...props} className={concatClasses(s.form, props.className)}>
            {props.children}
        </form>
    );
}

export default CmForm;