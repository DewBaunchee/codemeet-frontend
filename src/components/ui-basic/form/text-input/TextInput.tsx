import React, {ForwardedRef, InputHTMLAttributes} from "react";
import s from "../CmForm.module.css";
import {concatClasses} from "../../../../tools/util-functions";

const TextInput = React.forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <input ref={ref}
               type="text"
               {...props}
               className={concatClasses(s.input, props.className)}
        />
    );
});

export default TextInput;