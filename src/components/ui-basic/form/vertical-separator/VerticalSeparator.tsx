import React from "react";
import s from "./VerticalSeperator.module.css";
import {classNames} from "../../../../tools/util-functions";

const VerticalSeparator = () => {
    return (
        <hr className={classNames(s.sep)}/>
    );
};

export default VerticalSeparator;