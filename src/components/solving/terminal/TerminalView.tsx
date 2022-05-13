import React, {createRef, HTMLAttributes, useEffect, useState} from "react";
import {Terminal, TextPart} from "../../../domain/terminal/Terminal";
import s from "./Terminal.module.css";
import {concatClasses} from "../../../tools/util-functions";

export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {

    terminal: Terminal;

}

const TerminalView = ({terminal, ...props}: TerminalProps) => {
    const [focused, setFocused] = useState(false);
    const [listening, setListening] = useState(false);
    const [lines, setLines] = useState<TextPart[][]>([]);
    const [entered, setEntered] = useState("");

    useEffect(() => {
        terminal.listening().subscribe(setListening);
        terminal.lines().subscribe(setLines);
    }, []);

    useEffect(() => {
        const lines = entered.split(/\r?\n|\r/g);
        const lastLine = lines[lines.length - 1];
        if (lines.length > 1) {
            terminal.enter(entered.substring(0, entered.length - lastLine.length));
        }
        setEntered(lastLine);
    }, [entered]);

    const inputRef = createRef<HTMLInputElement>();

    return (
        <div {...props} className={concatClasses(s.container, props.className)}
             onClick={() => inputRef.current?.focus()}>
            {
                lines.map((line, index) => (
                    <p key={index === lines.length - 1 ? "last" : index} className={s.line}>
                        {
                            line.map((part, index) => (
                                <span key={index} className={s[part.type]}>{part.text}</span>
                            ))
                        }
                        {
                            listening && index === lines.length - 1
                                ? <input ref={inputRef}
                                         key="input"
                                         type="text"
                                         className={s.inputLine}
                                         value={entered}
                                         onChange={event => setEntered(event.target.value)}
                                         onKeyDown={event => {
                                             if (event.key === "Enter") {
                                                 setEntered(entered + "\n");
                                             }
                                         }}
                                />
                                : undefined
                        }
                    </p>
                ))
            }
        </div>
    );
};

export default TerminalView;