import React, {useEffect, useRef, useState} from "react";
import ResponsiveGrid from "../ui-basic/responsive-grid/ResponsiveGrid";
import Header from "../header/Header";
import {AreasType, ItemsBreakpoints} from "../../App";
import Editor from "./editor/Editor";
import CmWindow from "../ui-basic/window/CmWindow";
import {useNavigate, useParams} from "react-router-dom";
import {ObjectiveService} from "../../domain/services/objective/ObjectiveService";
import {Objective} from "../../domain/entities/Objective";
import ObjectiveItem from "../main/profile/objectives/ObjectiveItem";
import {anyBlank, isBlank} from "../../tools/util-functions";
import {RoutePath} from "../../domain/RoutePath";
import ImageButton from "../ui-basic/image-button/ImageButton";
import BackImage from "../../assets/back.svg";
import RunImage from "../../assets/run.svg";
import StopImage from "../../assets/stop.svg";
import SaveImage from "../../assets/save.svg";
import {CodeExecutor} from "../../domain/services/code/CodeExecutor";
import TerminalView from "./terminal/TerminalView";
import {Terminal} from "../../domain/terminal/Terminal";
import LogoutButton from "../header/LogoutButton";
import ToggleButton from "../ui-basic/toggle-button/ToggleButton";

const rows: ItemsBreakpoints = {
    xsmall: ["xxsmall", "small", "auto", "1/3"],
    small: ["xxsmall", "small", "auto", "1/3"],
    medium: ["xxsmall", "auto", "1/3"],
    large: ["xxsmall", "auto", "1/3"],
};

const cols: ItemsBreakpoints = {
    xsmall: ["auto"],
    small: ["auto"],
    medium: ["small", "xsmall", "auto"],
    large: ["medium", "auto"],
};

const areas: AreasType = {
    xsmall: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "editor", start: [0, 2], end: [0, 2]},
        {name: "terminal", start: [0, 3], end: [0, 3]},
        {name: "objective", start: [0, 1], end: [0, 1]},
    ],
    small: [
        {name: "header", start: [0, 0], end: [0, 0]},
        {name: "editor", start: [0, 2], end: [0, 2]},
        {name: "terminal", start: [0, 3], end: [0, 3]},
        {name: "objective", start: [0, 1], end: [0, 1]},
    ],
    medium: [
        {name: "header", start: [2, 0], end: [2, 0]},
        {name: "editor", start: [2, 1], end: [2, 1]},
        {name: "terminal", start: [2, 2], end: [2, 2]},
        {name: "objective", start: [0, 0], end: [1, 2]},
    ],
    large: [
        {name: "header", start: [1, 0], end: [1, 0]},
        {name: "editor", start: [1, 1], end: [1, 1]},
        {name: "terminal", start: [1, 2], end: [1, 2]},
        {name: "objective", start: [0, 0], end: [0, 2]},
    ],
};

const Solving = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [solved, setSolved] = useState(false);
    const [language, setLanguage] = useState("python");

    const [objective, setObjective] = useState<Objective>();
    const [code, setCode] = useState("");

    const [waiting, setWaiting] = useState(false);
    const [running, setRunning] = useState(false);
    const [terminal, setTerminal] = useState<Terminal>();

    const objectiveRef = useRef<Objective>();
    const codeRef = useRef<string>();
    const languageRef = useRef<string>(language);
    const solvedRef = useRef<boolean>();

    useEffect(() => {
        ObjectiveService.get(Number(id)).subscribe(objective => {
            if (isBlank(objective)) {
                navigate(RoutePath.MAIN, {replace: true});
                return;
            }
            setObjective(objective);
        });
    }, []);

    useEffect(() => {
        ObjectiveService.getSolved(Number(id), language).subscribe(solving => {
            if (!solving) return;
            setCode(solving.code);
            setLanguage(solving.programmingLanguage.key);
            setSolved(solving.solved);
        });
    }, [language]);

    useEffect(() => {
        objectiveRef.current = objective;
    }, [objective]);

    useEffect(() => {
        codeRef.current = code;
    }, [code]);

    useEffect(() => {
        languageRef.current = language;
    }, [language]);

    useEffect(() => {
        solvedRef.current = solved;
    }, [solved]);

    useEffect(() => () => save(objectiveRef.current!, languageRef.current, codeRef.current || "", solvedRef.current!), []);

    useEffect(() => {
        if (isBlank(terminal)) setRunning(false);
        terminal?.listening()?.subscribe(setRunning)
    }, [terminal]);

    const save = (objective: Objective, language: string, code: string, solved: boolean) => {
        if (anyBlank(objective, solved)) return;
        ObjectiveService.save(objective!.id, language, code, solved!)
            .subscribe(() => {
                if (solved) {
                    setSolved(solved);
                    navigate(RoutePath.MAIN, {replace: true});
                }
            });
    };

    const run = () => {
        setTerminal(undefined);
        setWaiting(true);
        setTimeout(() => {
            setWaiting(false);
        }, 2000);
        CodeExecutor.execute(language, code).subscribe(setTerminal);
    };

    const stop = () => {
        terminal!.stopListening();
    };

    const disableRun = () => {
        return waiting || running;
    };

    return (
        <ResponsiveGrid
            rows={rows}
            columns={cols}
            areas={areas}
        >
            <Header gridArea="header">
                <ImageButton image={BackImage} onClick={() => navigate(RoutePath.MAIN, {replace: true})}/>
                <ImageButton image={RunImage} onClick={run} disabled={disableRun()}/>
                <ImageButton image={StopImage} onClick={stop} disabled={!disableRun()}/>
                <ToggleButton states={[{key: "python", label: "Python"}, {key: "javascript", label: "Javascript"}]}
                              activeKey={language}
                              onNext={setLanguage}
                              style={{marginLeft: "auto"}}/>
                <ImageButton image={SaveImage} onClick={() => save(objective!, language, code, true)}/>
                <LogoutButton/>
            </Header>
            <Editor gridArea="editor" lang={language} code={code} onChange={setCode}/>
            <CmWindow gridArea="terminal">
                {terminal ? <TerminalView terminal={terminal}/> : void 0}
            </CmWindow>
            <CmWindow gridArea="objective" style={{padding: "10px"}}>
                {
                    objective
                        ? <ObjectiveItem style={{cursor: "default"}} onlyInfo={true} objective={objective}/>
                        : undefined
                }
            </CmWindow>
        </ResponsiveGrid>
    );
};

export default Solving;