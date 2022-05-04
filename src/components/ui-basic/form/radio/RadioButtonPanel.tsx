import React, {HTMLAttributes} from 'react';
import s from "./RadioButtonPanel.module.css";
import {concatClasses} from "../../../../tools/util-functions";

// @ts-ignore
export interface RadioButtonPanelProps extends  HTMLAttributes<HTMLSpanElement> {

    options: string[];

    active?: string;

    onChange?: (active: string) => void;

}

const RadioButtonPanel = ({
                              options,
                              active,
                              onChange,
                              ...props
                          }:  RadioButtonPanelProps) => {
    return (
        <span {...props} className={concatClasses(s.container, props.className)}>
            {
                options.map(option => (
                    <span className={`${s.option} ${option === active ? s.active : ""}`}
                          onClick={() => onChange && onChange(option)}>
                        <button>{option}</button>
                    </span>
                ))
            }
        </span>
    );
};

export default RadioButtonPanel;