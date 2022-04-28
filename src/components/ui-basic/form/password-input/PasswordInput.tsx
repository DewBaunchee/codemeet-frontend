import React, {ForwardedRef, InputHTMLAttributes} from 'react';
import s from "../CmForm.module.css";
import {classNames} from "../../../../tools/util-functions";

const PasswordInput = React.forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <input ref={ref}
               type="password"
               {...props}
               className={classNames(s.input, props.className || "")}
        />
    );
});

export default PasswordInput;