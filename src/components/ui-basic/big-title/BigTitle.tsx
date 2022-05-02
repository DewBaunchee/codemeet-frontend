import React, {HTMLAttributes} from 'react';
import {classNames} from "../../../tools/util-functions";
import s from "./BigTitle.module.css";

const BigTitle = (props: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <p {...props} className={classNames(s.title, props.className || "")}>{props.children}</p>
    );
};

export default BigTitle;