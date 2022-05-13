import React, {HTMLAttributes} from "react";
import {Objective} from "../../../../domain/entities/Objective";
import s from "./Objective.module.css";
import {concatClasses} from "../../../../tools/util-functions";

export interface ObjectiveProps extends HTMLAttributes<HTMLDivElement> {

    objective: Objective;

    onlyInfo?: boolean;

}

const ObjectiveItem = ({objective, onlyInfo, ...props}: ObjectiveProps) => {
    return (
        <div {...props} className={concatClasses(props.className, s.item, objective.solved ? s.solved : "")}>
            {!!onlyInfo ? undefined : <span className={`${s.button}`}/>}
            <span className={`${s.info}`}>
                <h5>{objective.title}</h5>
                <span>{objective.description}</span>
            </span>
        </div>
    );
};

export default ObjectiveItem;