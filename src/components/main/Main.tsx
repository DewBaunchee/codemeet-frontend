import React from "react";
import {AreasType, ItemsBreakpoints} from "../../App";
import Header from "../header/Header";
import ResponsiveGrid from "../ui-basic/responsive-grid/ResponsiveGrid";
import Profile from "./profile/Profile";
import Search from "./search/Search";
import SearchFilter from "./search-filter/SearchFilter";

const rows: ItemsBreakpoints = {
    xsmall: ["10%", "80%", "10%", "90%"],
    small: ["xxsmall", "small", "auto"],
    medium: ["xxsmall", "small", "auto"],
    large: ["xxsmall", "small", "auto"],
};

const cols: ItemsBreakpoints = {
    xsmall: ["auto"],
    small: ["small" , "auto"],
    medium: ["medium", "auto"],
    large: ["medium", "auto"],
};

const areas: AreasType = {
    xsmall: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "profile", start: [0, 1], end: [0, 1]},
        {name: "search", start: [0, 2], end: [0, 2]},
        {name: "filter", start: [0, 3], end: [0, 3]},
    ],
    small: [
        {name: "header", start: [0, 0], end: [1, 0]},
        {name: "profile", start: [1, 1], end: [1, 2]},
        {name: "search", start: [0, 0], end: [0, 1]},
        {name: "filter", start: [0, 2], end: [0, 2]},
    ],
    medium: [
        {name: "header", start: [0, 0], end: [1, 0]},
        {name: "profile", start: [1, 1], end: [1, 2]},
        {name: "search", start: [0, 0], end: [0, 1]},
        {name: "filter", start: [0, 2], end: [0, 2]},
    ],
    large: [
        {name: "header", start: [0, 0], end: [1, 0]},
        {name: "profile", start: [1, 1], end: [1, 2]},
        {name: "search", start: [0, 0], end: [0, 1]},
        {name: "filter", start: [0, 2], end: [0, 2]},
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
            <Profile gridArea="profile"/>
            <Search gridArea="search"/>
            <SearchFilter gridArea="filter"/>
        </ResponsiveGrid>
    );
};

export default Main;