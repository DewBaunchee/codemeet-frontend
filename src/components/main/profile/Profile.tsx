import React, {ForwardedRef, useState} from 'react';
import CmWindow from "../../ui-basic/window/CmWindow";
import s from "./Profile.module.css";
import TabbedWindow from '../../ui-basic/tabbed-window/TabbedWindow';
import PhotoGallery from "../../ui-basic/photo-viewer/PhotoGallery";
import SelectableItems from '../../ui-basic/selectable-items/SelectableItems';

const Profile = React.forwardRef(
    (
        props: { gridArea: string },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [name, setName] = useState("Name");
        const [active, setActive] = useState("Profile");
        const [activeItems, setActiveItems] = useState<string[]>([]);

        return (
            <CmWindow ref={ref} gridArea={props.gridArea} style={{background: "#EEE"}}>
                <div className={`row m-0 ${s.header}`}>
                    <div className={`align-self-center ${s.avatar}`}>
                        <img className={s.avatarImage} alt={name}/>
                        <p className={s.avatarName}>{name}</p>
                    </div>
                </div>
                <div className="row m-0 justify-content-center">
                    <TabbedWindow className="mt-3 p-0 col-xxl-8 col-xl-10 col-lg-12"
                                  active={active}
                                  onChange={active => setActive(active)}>
                        <div key="Profile">
                            <PhotoGallery photos={[
                                // @ts-ignore
                                {id: 1, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                            ]}/>
                            <SelectableItems
                                selected={activeItems}
                                onSelected={selected => setActiveItems(selected)}
                                items={[
                                    {name: "First", image: undefined},
                                    {name: "Second", image: undefined},
                                    {name: "Third", image: undefined},
                                    {name: "Forth", image: undefined},
                                    {name: "Fifth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Sixth", image: undefined},
                                    {name: "Seventh", image: undefined},
                                ]}
                            />
                        </div>
                        <div key="View">
                            <PhotoGallery photos={[
                                // @ts-ignore
                                {id: 1, data: undefined},
                                // @ts-ignore
                                {id: 2, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                                // @ts-ignore
                                {id: 3, data: undefined},
                            ]}/>
                        </div>
                    </TabbedWindow>
                </div>
            </CmWindow>
        );
    });

export default Profile;