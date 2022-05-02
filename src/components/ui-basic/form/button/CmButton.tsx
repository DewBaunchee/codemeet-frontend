import React, {ButtonHTMLAttributes, ForwardedRef} from 'react';
import s from "../CmForm.module.css";
import {classNames} from "../../../../tools/util-functions";

const CmButton = React.forwardRef((
    props: ButtonHTMLAttributes<HTMLButtonElement> & { styleType?: string },
    ref: ForwardedRef<HTMLButtonElement>
) => {
    return (
        <button ref={ref}
                type="button"
                {...props}
                className={classNames(s.button, s[props.styleType || ""] || "", props.className || "")}
        >
            {props.children}
        </button>
    );
});

export default CmButton;