import React from "react";
import s from "./VerticalSeperator.module.css";
import {concatClasses} from "../../../../tools/util-functions";

const VerticalSeparator = () => {
    return (
        <hr className={concatClasses(s.sep)}/>
    );
};

export default VerticalSeparator;