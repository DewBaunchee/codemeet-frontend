import React, {HTMLAttributes, LegacyRef} from 'react';
import s from "./Avatar.module.css";
import Converter from "../../../../tools/converter";
import {concatClasses} from "../../../../tools/util-functions";
import {Profile} from "../../../../domain/entities/Profile";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {

    onNameChange?: (name: string) => void;

    onNameBlur?: (name: string) => void;

    name: string;

    profile?: Profile;

    editable: boolean;

}

const Avatar = React.forwardRef(({
                                     name,
                                     onNameChange,
                                     onNameBlur,
                                     profile,
                                     editable,
                                     ...props
                                 }: AvatarProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <div ref={ref} {...props} className={concatClasses(props.className, s.avatar)}>
            <img className={s.avatarImage} src={Converter.convertImage(profile?.mainPhoto?.data)} alt={profile?.name}/>
            {
                editable
                    ? <input className={s.avatarName}
                             value={name}
                             onChange={event => onNameChange && onNameChange(event.target.value)}
                             onKeyDown={event => {
                                 if (event.key === "Enter") (event.target as HTMLInputElement).blur();
                             }}
                             onBlur={() => {
                                 onNameBlur && onNameBlur(name);
                             }}
                    />
                    : <span className={s.avatarName}>{profile?.name || ""}</span>
            }
        </div>
    );
});

export default Avatar;