import React, {ForwardedRef} from 'react';
import CmWindow from '../../ui-basic/window/CmWindow';

const SearchFilter = React.forwardRef(
    (
        props: { gridArea: string },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
    return (
        <CmWindow ref={ref} gridArea={props.gridArea}>
            Filter
        </CmWindow>
    );
});

export default SearchFilter;