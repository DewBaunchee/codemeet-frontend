import {Grid, GridProps, ResponsiveContext} from "grommet";
import React, {HTMLAttributes} from "react";
import {isBlank} from "../../../tools/util-functions";
import {AreasType, AreaType, ItemsBreakpoints} from "../../../App";

export type CmGridProps = {
    rowCount?: number;
    colCount?: number;
};

const getSameItems: (count?: number) => string[] = count => {
    if (isBlank(count)) return [];
    const item = `${100 / count!}%`;
    return Array.from(Array(count)).map(() => item);
}

// @ts-ignore
interface OverriddenProps extends GridProps {
    areas?: AreasType | AreaType;
    rows?: ItemsBreakpoints | string[];
    columns?: ItemsBreakpoints | string[];
}

const ResponsiveGrid = (props: HTMLAttributes<HTMLElement> & CmGridProps & OverriddenProps) => (
    <ResponsiveContext.Consumer>
        {size => {
            const columns = props.columns || getSameItems(props.colCount);
            const rows = props.rows || getSameItems(props.rowCount);
            const areasAttr = (props.areas && props.areas[size]) || props.areas;

            return (
                <Grid
                    style={{width: "100%", height: "100%", padding: "10px"}}
                    gap="small"
                    {...props}
                    areas={areasAttr}
                    rows={rows[size] || rows}
                    columns={columns[size] || columns}
                >
                    {props.children}
                </Grid>
            );
        }}
    </ResponsiveContext.Consumer>
);

export default ResponsiveGrid;