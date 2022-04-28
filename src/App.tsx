import React, {ReactElement} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {RoutePath} from "./domain/RoutePath";
import Login from "./components/login/Login";
import "./App.module.css";
import Registration from "./components/registration/Registration";
import {AuthenticationService} from "./domain/services/security/AuthenticationService";
import Main from "./components/main/Main";
import CmButton from "./components/ui-basic/form/button/CmButton";

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

function App() {
    const navigate = useNavigate();

    const logout = () => {
        AuthenticationService.logout();
        navigate(RoutePath.LOGIN);
    };

    const isAuthenticated = AuthenticationService.isAuthenticated();

    return (
        <span>
            <CmButton onClick={logout}>Logout</CmButton>
            <Routes>
                <Route path={RoutePath.MAIN} element={privateElement(isAuthenticated, <Main/>)}/>
                <Route path={RoutePath.LOGIN} element={publicElement(isAuthenticated, <Login/>)}/>
                <Route path={RoutePath.REGISTRATION} element={publicElement(isAuthenticated, <Registration/>)}/>
            </Routes>
        </span>
    );
}

export default App;
