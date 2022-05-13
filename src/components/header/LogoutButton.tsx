import React, {HTMLAttributes} from "react";
import ImageButton from "../ui-basic/image-button/ImageButton";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import {RoutePath} from "../../domain/RoutePath";
import {useNavigate} from "react-router-dom";
import LogoutImage from "../../assets/logout.svg";

export interface LogoutButtonProps extends HTMLAttributes<HTMLButtonElement> {

    disabled?: boolean;

}

const LogoutButton = (props: LogoutButtonProps) => {
    const navigate = useNavigate();
    const logout = () => {
        AuthenticationService.logout();
        navigate(RoutePath.LOGIN, {replace: true});
        navigate(0);
    };
    return (
        <ImageButton {...props}
                     image={LogoutImage}
                     onClick={logout}
        >
            Logout
        </ImageButton>
    );
};

export default LogoutButton;