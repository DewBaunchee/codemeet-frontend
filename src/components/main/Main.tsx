import React, {useEffect, useState} from "react";
import {AreasType, ItemsBreakpoints} from "../../App";
import Header from "../header/Header";
import ResponsiveGrid from "../ui-basic/responsive-grid/ResponsiveGrid";
import ProfileView from "./profile/ProfileView";
import LogoutButton from "../header/LogoutButton";
import {ObjectiveService} from "../../domain/services/objective/ObjectiveService";
import ImageButton from "../ui-basic/image-button/ImageButton";
import ContinueImage from "../../assets/continue.svg";
import {RoutePath} from "../../domain/RoutePath";
import {Link} from "react-router-dom";
import SearchImage from "../../assets/search.svg";

const rows: ItemsBreakpoints = {
    xsmall: ["10%", "80%", "10%", "90%"],
    small: ["xxsmall", "small", "auto"],
    medium: ["xxsmall", "small", "auto"],
    large: ["xxsmall", "small", "auto"],
};

const cols: ItemsBreakpoints = {
    xsmall: ["auto"],
    small: ["auto"],
    medium: ["auto"],
    large: ["auto"],
};

const areas: AreasType = {
    xsmall: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "profile", start: [0, 1], end: [0, 1]},
    ],
    small: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "profile", start: [0, 1], end: [0, 2]},
    ],
    medium: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "profile", start: [0, 1], end: [0, 2]},
    ],
    large: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "profile", start: [0, 1], end: [0, 2]},
    ],
};

const Main = () => {
    const [lastSolving, setLastSolving] = useState<number>(-1);
    useEffect(() => {
        ObjectiveService.getLastSolving().subscribe(id => {
            setLastSolving(id);
        });
    }, []);
    return (
        <ResponsiveGrid
            rows={rows}
            columns={cols}
            areas={areas}
        >
            <Header gridArea="header">
                <Link to={RoutePath.SEARCHING}>
                    <ImageButton image={SearchImage} label={"Meet"}/>
                </Link>
                {
                    lastSolving < 0 ? undefined :

                        <Link to={`${RoutePath.SOLVING}/${lastSolving}`}>
                            <ImageButton image={ContinueImage} label={"Continue"}/>
                        </Link>
                }
                <LogoutButton style={{marginLeft: "auto"}}/>
            </Header>
            <ProfileView gridArea="profile"/>
        </ResponsiveGrid>
    );
};

export default Main;