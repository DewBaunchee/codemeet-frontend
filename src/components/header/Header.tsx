import React, {ForwardedRef, HTMLAttributes} from "react";
import CmWindow from "../ui-basic/window/CmWindow";
import {BoxProps} from "grommet";

const Header = React.forwardRef(
    (
        props: { gridArea: string } & HTMLAttributes<HTMLDivElement> & BoxProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <CmWindow ref={ref} {...props}>
                <div style={{height: "100%", padding: "auto", width: "100%", alignItems: "center", gap: "5px"}}
                     className="px-2 d-flex"
                >
                    {props.children}
                </div>
            </CmWindow>
        );
    });

export default Header;