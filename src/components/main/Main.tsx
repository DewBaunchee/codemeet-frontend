import React from "react";
import {AreasType, ItemsBreakpoints} from "../../App";
import Header from "../header/Header";
import ResponsiveGrid from "../ui-basic/responsive-grid/ResponsiveGrid";
import ProfileView from "./profile/ProfileView";

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
    return (
        <ResponsiveGrid
            rows={rows}
            columns={cols}
            areas={areas}
        >
            <Header gridArea="header"/>
            <ProfileView gridArea="profile"/>
        </ResponsiveGrid>
    );
};

export default Main;