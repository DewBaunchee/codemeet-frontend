import React, {HTMLAttributes} from 'react';
import ImageButton from "../image-button/ImageButton";

export interface ToggleButtonProps extends HTMLAttributes<HTMLButtonElement> {

    states: { key: string; label: string; }[];

    activeKey: string;

    onNext?: (active: string) => void;

}

const ToggleButton = ({states, activeKey, onNext, ...props}: ToggleButtonProps) => {
    return (
        <ImageButton {...props}
                     label={states.find(state => state.key === activeKey)?.label}
                     onClick={() => onNext && onNext(states[(states.findIndex(state => state.key === activeKey) + 1) % states.length].key)}
        />
    );
};

export default ToggleButton;