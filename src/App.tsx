import React, {ReactElement} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutePath} from "./domain/RoutePath";
import Login from "./components/login/Login";
import "./App.module.css";
import "./styles/ScrollBar.module.css";
import Registration from "./components/registration/Registration";
import {AuthenticationService} from "./domain/services/security/AuthenticationService";
import Main from "./components/main/Main";
import {deepMerge} from "grommet/utils";
import {GridSizeType, Grommet, grommet} from "grommet";

const privateElement = (isAuthenticated: boolean, element: ReactElement) => {
    return isAuthenticated ? (
        element
    ) : (
        <Navigate to={RoutePath.LOGIN}/>
    )
}

const publicElement = (isAuthenticated: boolean, element: ReactElement) => {
    return !isAuthenticated ? (
        element
    ) : (
        <Navigate to={RoutePath.MAIN}/>
    )
}

export interface Breakpoints<Type> {
    xsmall: Type;
    small: Type;
    medium: Type;
    large: Type;
}

export type AreaType = { name?: string; start?: number[]; end?: number[] }[] | string[][];
export type AreasType = Breakpoints<AreaType>;
export type ItemsBreakpoints = Breakpoints<GridSizeType[]>;

const breakpoints: Breakpoints<{ value: number }> = {
    xsmall: {value: 600},
    small: {value: 900},
    medium: {value: 1200},
    large: {value: 1500},
};

const grommetTheme = deepMerge(grommet, {global: {breakpoints}});

const App = () => {
    const isAuthenticated = AuthenticationService.isAuthenticated();
    return (
        <Grommet theme={grommetTheme} full={true}>
            <input id="file-input" type="file" multiple={true} style={{display: "none"}}/>
            <Routes>
                <Route path={RoutePath.MAIN} element={privateElement(isAuthenticated, <Main/>)}/>
                <Route path={RoutePath.LOGIN} element={publicElement(isAuthenticated, <Login/>)}/>
                <Route path={RoutePath.REGISTRATION} element={publicElement(isAuthenticated, <Registration/>)}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Grommet>
    );
}

export default App;
