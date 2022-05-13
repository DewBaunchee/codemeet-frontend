import React, {ForwardedRef, HTMLAttributes} from "react";
import {concatClasses} from "../../../tools/util-functions";
import s from "./CmWindow.module.css";
import {Box, BoxProps} from "grommet";

const CmWindow = React.forwardRef(
    (
        props: HTMLAttributes<HTMLDivElement> & BoxProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <Box ref={ref} {...props} className={concatClasses(s.div, props.className)}>
                {props.children}
            </Box>
        );
    });

export default CmWindow;