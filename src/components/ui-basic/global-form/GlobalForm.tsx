import React from "react";
import CmWindow from "../window/CmWindow";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const GlobalForm = (props: any) => {
    return (
        <ResponsiveGrid
            rows={["auto"]}
            columns={["auto"]}
            areas={[{name: "form", start: [0, 0], end: [0, 0]}]}
            alignContent="center"
        >
            <div className="row p-0 m-0" style={{justifyContent: "center"}}>
                <CmWindow gridArea="form" className="p-5 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-10">
                    {props.children}
                </CmWindow>
            </div>
        </ResponsiveGrid>
    );
};

export default GlobalForm;