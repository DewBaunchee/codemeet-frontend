import React, {ForwardedRef, InputHTMLAttributes} from 'react';
import s from "../CmForm.module.css";
import {classNames} from "../../../../tools/util-functions";

const TextInput = React.forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <input ref={ref}
               type="text"
               {...props}
               className={classNames(s.input, props.className || "")}
        />
    );
});

export default TextInput;