import React, {ForwardedRef, useCallback} from 'react';
import CmWindow from "../ui-basic/window/CmWindow";
import CmButton from "../ui-basic/form/button/CmButton";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../domain/RoutePath";

const Header = React.forwardRef(
    (
        props: { gridArea: string },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const navigate = useNavigate();
        const logout = () => {
            AuthenticationService.logout();
            navigate(RoutePath.LOGIN, {replace: true});
            navigate(0);
        };
        return (
            <CmWindow ref={ref} {...props}>
                <CmButton style={{float: "right"}} onClick={logout}>Logout</CmButton>
            </CmWindow>
        );
    });

export default Header;