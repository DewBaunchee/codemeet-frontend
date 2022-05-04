import React, {HTMLAttributes} from 'react';
import {concatClasses} from "../../../tools/util-functions";
import s from "./SelectableItems.module.css";

export interface SelectableItemsProps extends HTMLAttributes<HTMLSpanElement> {

    items: { name: string; image?: string }[];

    selected?: string[];

    onSelected?: (selected: string[]) => void;

}

const SelectableItems = ({items, selected, onSelected, ...props}: SelectableItemsProps) => {
    selected ||= [];
    const toggle = (itemName: string) => {
        if (selected!.includes(itemName)) {
            onSelected && onSelected(selected!.filter(item => item !== itemName));
        } else {
            onSelected && onSelected([...selected!, itemName]);
        }
    };

    return (
        <span {...props} className={concatClasses(s.container, props.className)}>
            {
                items.map(item => (
                    <span className={concatClasses(s.item, (selected || []).includes(item.name) ? s.active : "")}
                          onClick={() => toggle(item.name)}
                    >
                        {item.image ? <img src={require(item.image)} alt=""/> : undefined}
                        <span>{item.name}</span>
                    </span>
                ))
            }
        </span>
    );
};

export default SelectableItems;