import React, {ForwardedRef, HTMLAttributes} from "react";
import CmWindow from "../ui-basic/window/CmWindow";
import {AuthenticationService} from "../../domain/services/security/AuthenticationService";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../domain/RoutePath";
import {BoxProps} from "grommet";
import ImageButton from "../ui-basic/image-button/ImageButton";
import LogoutImage from "../../assets/logout.svg";

const Header = React.forwardRef(
    (
        props: { gridArea: string } & HTMLAttributes<HTMLDivElement> & BoxProps,
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
                <div style={{height: "100%", padding: "auto", width: "100%", alignItems: "center", gap: "5px"}}
                     className="px-2 d-flex"
                >
                    {props.children}
                    <ImageButton style={{marginLeft: "auto"}}
                                 image={LogoutImage}
                                 onClick={logout}
                    >
                        Logout
                    </ImageButton>
                </div>
            </CmWindow>
        );
    });

export default Header;