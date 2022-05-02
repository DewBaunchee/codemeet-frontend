import React, {ForwardedRef} from 'react';
import CmWindow from "../../ui-basic/window/CmWindow";

const Search = React.forwardRef(
    (
        props: { gridArea: string },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
    return (
        <CmWindow ref={ref} gridArea={props.gridArea}>Search</CmWindow>
    );
});

export default Search;