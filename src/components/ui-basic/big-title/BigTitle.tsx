import React, {HTMLAttributes} from "react";
import {concatClasses} from "../../../tools/util-functions";
import s from "./BigTitle.module.css";

const BigTitle = (props: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <p {...props} className={concatClasses(s.title, props.className)}>{props.children}</p>
    );
};

export default BigTitle;