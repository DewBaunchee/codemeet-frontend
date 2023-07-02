import React, {useEffect, useState} from "react";
import ResponsiveGrid from "../ui-basic/responsive-grid/ResponsiveGrid";
import Header from "../header/Header";
import {AreasType, ItemsBreakpoints} from "../../App";
import CmWindow from "../ui-basic/window/CmWindow";
import {useNavigate} from "react-router-dom";
import ObjectiveItem from "../main/profile/objectives/ObjectiveItem";
import {isBlank} from "../../tools/util-functions";
import {RoutePath} from "../../domain/RoutePath";
import ImageButton from "../ui-basic/image-button/ImageButton";
import BackImage from "../../assets/back.svg";
import RunImage from "../../assets/run.svg";
import StopImage from "../../assets/stop.svg";
import {CodeExecutor} from "../../domain/services/code/CodeExecutor";
import {Terminal} from "../../domain/terminal/Terminal";
import LogoutButton from "../header/LogoutButton";
import TerminalView from "../solving/terminal/TerminalView";
import {SearchingCoincidence} from "../../domain/entities/SearchingCoincidence";
import {SearchingService} from "../../domain/services/searching/SearchingService";
import Editor from "../solving/editor/Editor";
import Avatar from "../main/profile/avatar/Avatar";
import CmButton from "../ui-basic/form/button/CmButton";

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

const Searching = () => {
    const navigate = useNavigate();

    const [searchCompleted, setSearchCompleted] = useState(false);
    const [coincidence, setCoincidence] = useState<SearchingCoincidence>();

    const [waiting, setWaiting] = useState(false);
    const [running, setRunning] = useState(false);
    const [terminal, setTerminal] = useState<Terminal>();

    const next = () => {
        setSearchCompleted(false);
        SearchingService.next().subscribe(coincidence => {
            setCoincidence(coincidence);
            setSearchCompleted(true);
        });
    };

    useEffect(() => next(), []);

    useEffect(() => {
        if (isBlank(terminal)) setRunning(false);
        terminal?.listening()?.subscribe(setRunning)
    }, [terminal]);

    const run = () => {
        setTerminal(undefined);
        setWaiting(true);
        setTimeout(() => {
            setWaiting(false);
        }, 2000);

        const {programmingLanguage, code} = coincidence!.solvedObjective;
        CodeExecutor.execute(programmingLanguage.key, code).subscribe(setTerminal);
    };

    const stop = () => {
        terminal!.stopListening();
    };

    const disableRun = () => {
        return waiting || running;
    };

    return coincidence ? (
        <ResponsiveGrid
            rows={rows}
            columns={cols}
            areas={areas}
        >
            <Header gridArea="header">
                <ImageButton image={BackImage} onClick={() => navigate(RoutePath.MAIN, {replace: true})}/>
                <ImageButton image={RunImage} onClick={run} disabled={disableRun()}/>
                <ImageButton image={StopImage} onClick={stop} disabled={!disableRun()}/>
                <ImageButton label={coincidence.solvedObjective.programmingLanguage.label}
                             style={{marginLeft: "auto"}}/>
                <LogoutButton/>
            </Header>
            <Editor gridArea="editor"
                    lang={coincidence.solvedObjective.programmingLanguage.key}
                    code={coincidence.solvedObjective.code}/>
            <CmWindow gridArea="terminal">
                {terminal ? <TerminalView terminal={terminal}/> : void 0}
            </CmWindow>
            <CmWindow gridArea="objective" style={{padding: "10px"}}>
                <ObjectiveItem style={{cursor: "default"}}
                               onlyInfo={true}
                               objective={coincidence.solvedObjective.objective}/>

                <Avatar className="align-self-center"
                        style={{marginTop: "auto", marginBottom: "10px"}}
                        name={coincidence.profile.name}
                        profile={coincidence.profile}
                        editable={false}
                />
                <CmButton className="col-12 m-0"
                          styleType="primary"
                          onClick={next}
                >
                    Find next
                </CmButton>
            </CmWindow>
        </ResponsiveGrid>
    ) : (
        <div
            className="d-flex justify-content-center"
            style={{
                color: "#555",
                fontSize: "3em",
                position: "absolute",
                height: "100%",
                width: "100%",
            }}>
            <span className="align-self-center">
               {searchCompleted && "Sorry, we cannot find anyone :("}
            </span>
        </div>
    );
};

export default Searching;