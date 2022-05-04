import React, {HTMLAttributes, useState} from 'react';
import ImageConverter from "../../../../tools/converter";
import {concatClasses} from "../../../../tools/util-functions";
import s from "../CmForm.module.css";

// @ts-ignore
export interface ComboBoxProps extends HTMLAttributes<HTMLSpanElement> {

    active?: string;

    onChange?: (active: string) => void;

    open?: boolean;

    openToggled?: (opened: boolean) => void;

    options: { key: string; label?: string; image?: Buffer; }[];

}

const ComboBox = ({active, onChange, options, open, openToggled, ...props}: ComboBoxProps) => {
    const [opened, setOpened] = useState(open || false);

    const toElement = option => (
        option
            ?
            <span onClick={() => onChange && onChange(option.key)}>
                {option.image ? <img src={ImageConverter.convert(option.image)} alt=""/> : undefined}
                <span>{option.label}</span>
            </span>
            : undefined
    );

    return (
        // @ts-ignore
        <span {...props}
              className={concatClasses(s.comboBox, s.input, props.className)}
              onClick={() => {
                  setOpened(!opened);
                  openToggled && openToggled(!opened)
              }}>
            <span className={s.activeOption}>
                {toElement(options.find(option => option.key === active))}
            </span>
            <span className={concatClasses(s.comboMenu, opened ? s.comboMenuOpened : "")}>
                {options.filter(option => option.key !== active).map(toElement)}
            </span>
        </span>
    );
};

export default ComboBox;