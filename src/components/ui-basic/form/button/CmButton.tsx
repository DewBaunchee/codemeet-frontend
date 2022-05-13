import React, {ButtonHTMLAttributes, createRef, ForwardedRef, Ref} from "react";
import s from "../CmForm.module.css";
import {concatClasses} from "../../../../tools/util-functions";

const CmButton = React.forwardRef((
    { styleType, onEnter, ...props }: { styleType?: "primary" | "secondary", onEnter?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>,
    ref: Ref<HTMLButtonElement>
) => {
    const buttonRef = createRef<HTMLButtonElement>();
    if(onEnter) {
        document.addEventListener("keydown", event => {
            if (event.key === "Enter") buttonRef.current?.click();
        });
    }

    return (
        <button ref={buttonRef}
                type="button"
                {...props}
                className={concatClasses(s.button, s[styleType || ""], props.className)}
        >
            {props.children}
        </button>
    );
});

export default CmButton;