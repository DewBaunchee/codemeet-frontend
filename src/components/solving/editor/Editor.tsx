import React, {ForwardedRef} from "react";
import CmWindow from "../../ui-basic/window/CmWindow";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";

const extensions = {
    "python": python,
    "javascript": javascript,
};

const Editor = React.forwardRef(
    (
        props: { gridArea: string, lang: string, code: string, onChange?: (code: string) => void },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <CmWindow ref={ref} gridArea={props.gridArea}>
                <CodeMirror
                    value={props.code}
                    height="100%"
                    indentWithTab={false}
                    extensions={[extensions[props.lang]()]}
                    onChange={props.onChange}
                />
            </CmWindow>
        );
    });

export default Editor;