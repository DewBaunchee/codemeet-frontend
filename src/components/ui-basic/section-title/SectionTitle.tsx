import React, {ForwardedRef, HTMLAttributes} from "react";
import {concatClasses} from "../../../tools/util-functions";
import s from "./SectionTitle.module.css";

export interface SectionTitleProps extends HTMLAttributes<HTMLParagraphElement> {

    label: string;

}

const SectionTitle = React.forwardRef(({
                                           label,
                                           ...props
                                       }: SectionTitleProps, ref: ForwardedRef<HTMLParagraphElement>) => {
    return (
        <p ref={ref} {...props} className={concatClasses(s.container, props.className)}>
            <span>{label}</span>
        </p>
    );
});

export default SectionTitle;