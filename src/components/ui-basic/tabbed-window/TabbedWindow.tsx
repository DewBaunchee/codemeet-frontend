import React, {Children, HTMLAttributes} from "react";
import RadioButtonPanel from "../form/radio/RadioButtonPanel";
import s from "./TabbedWindow.module.css";
import {concatClasses} from "../../../tools/util-functions";

// @ts-ignore
export interface TabbedWindowProps extends HTMLAttributes<HTMLDivElement> {

    active?: string;

    onChange?: (active: string) => void;

}

const TabbedWindow = (props: TabbedWindowProps) => {
    const children = Children.toArray(props.children);

    return (
        // @ts-ignore
        <div {...props} className={concatClasses(s.container, props.className)}>
            <RadioButtonPanel className={s.tabs}
                              active={props.active}
                              onChange={props.onChange}
                              options={children.map(window => window["key"].substring(2))}/>
            <div className={s.activeContainer}>
                {children.filter(window => window["key"].substring(2) === props.active).find(() => true)}
            </div>
        </div>
    );
};

export default TabbedWindow;