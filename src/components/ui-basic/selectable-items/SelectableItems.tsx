import React, {HTMLAttributes} from "react";
import {concatClasses} from "../../../tools/util-functions";
import s from "./SelectableItems.module.css";

export interface SelectableItemsProps extends HTMLAttributes<HTMLSpanElement> {

    items: { key: string, name: string; image?: string }[];

    selected?: string[];

    onSelected?: (selected: string[]) => void;

}

const SelectableItems = ({items, selected, onSelected, ...props}: SelectableItemsProps) => {
    selected ||= [];
    const toggle = (itemName: string) => {
        if (selected!.includes(itemName)) {
            onSelected && onSelected(selected!.filter(item => item !== itemName));
        } else {
            onSelected && onSelected([...(selected || []), itemName]);
        }
    };

    return (
        <span {...props} className={concatClasses(s.container, props.className)}>
            {
                items.map((item, index) => (
                    <span key={item.key} className={concatClasses(s.item, (selected || []).includes(item.key) ? s.active : "")}
                          style={{backgroundColor: pastelColors[index % pastelColors.length]}}
                          onClick={() => toggle(item.key)}
                    >
                        {item.image ? <img src={require(item.image)} alt=""/> : undefined}
                        <span>{item.name || item.key || ""}</span>
                    </span>
                ))
            }
        </span>
    );
};

const pastelColors: string[] = [
    "#EE4E4E",
    "#ECA554",
    "#A9A9A9",
    "#FF8B76",
    "#FFE278",
    "#C75050",
    "#CA0E0E",
    "#FFCBC1",
    "#FFF5BA",
];

export default SelectableItems;