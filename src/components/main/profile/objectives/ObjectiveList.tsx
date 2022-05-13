import React, {HTMLAttributes} from "react";
import {Objective} from "../../../../domain/entities/Objective";
import ObjectiveItem from "./ObjectiveItem";
import {concatClasses} from "../../../../tools/util-functions";
import s from "./Objective.module.css";
import {RoutePath} from "../../../../domain/RoutePath";
import {Link} from "react-router-dom";

export interface ObjectiveListProps extends HTMLAttributes<HTMLDivElement> {

    list: Objective[];

}

const ObjectiveList = ({list, ...props}: ObjectiveListProps) => {
    return (
        <div {...props} className={concatClasses(props.className, s.list)}>
            {
                list.map(objective =>
                    <Link to={`${RoutePath.SOLVING}/${objective.id}`} key={objective.id}>
                        <ObjectiveItem objective={objective}/>
                    </Link>)
            }
        </div>
    );
};

export default ObjectiveList;