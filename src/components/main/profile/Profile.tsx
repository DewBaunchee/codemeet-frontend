import React, {ForwardedRef} from 'react';
import CmWindow from "../../ui-basic/window/CmWindow";

const Profile = React.forwardRef(
    (
        props: { gridArea: string },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
    return (
        <CmWindow ref={ref} gridArea={props.gridArea}>Profile</CmWindow>
    );
});

export default Profile;