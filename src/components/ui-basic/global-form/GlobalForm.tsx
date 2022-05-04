import React from 'react';
import CmWindow from "../window/CmWindow";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const GlobalForm = (props: any) => {
    return (
        <ResponsiveGrid
            rows={["auto"]}
            columns={["40%", "20%", "40%"]}
            areas={[{name: "form", start: [1, 0], end: [1, 0]}]}
            alignContent="center"
        >
            <CmWindow gridArea="form" className="p-5">
                {props.children}
            </CmWindow>
        </ResponsiveGrid>
    );
};

export default GlobalForm;