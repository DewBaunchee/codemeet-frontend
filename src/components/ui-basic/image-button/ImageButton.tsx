import React, {ForwardedRef, HTMLAttributes} from "react";
import {concatClasses} from "../../../tools/util-functions";
import s from "./ImageButton.module.css";

export interface ImageButtonProps extends HTMLAttributes<HTMLButtonElement> {

    image?: any;

    label?: string;

    onClick?: () => void;

    disabled?: boolean;

}


const ImageButton = React.forwardRef(({image, onClick, label, ...props}: ImageButtonProps,
                                      ref: ForwardedRef<HTMLButtonElement>) => {
    return (
        <button ref={ref} {...props}
                onClick={onClick}
                className={concatClasses(props.className, s.button)}
        >

            {image && <img src={image} alt="" className="align-self-center"/>}
            <span className="align-self-center align-text-bottom">
                {label}
            </span>
        </button>
    );
});

export default ImageButton;