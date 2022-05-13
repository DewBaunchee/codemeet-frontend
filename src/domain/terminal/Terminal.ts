import {Socket} from "socket.io-client";
import {BehaviorSubject, Observable} from "rxjs";
import Converter from "../../tools/converter";
import {isBlank} from "../../tools/util-functions";

export class Terminal {

    private readonly _listening: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private readonly _lines: BehaviorSubject<TextPart[][]> = new BehaviorSubject<TextPart[][]>([]);

    private listeningSocket?: Socket;

    public static listen(ws: Socket): Terminal {
        const terminal = new Terminal();
        terminal.listen(ws);
        return terminal;
    }

    public listen(ws: Socket) {
        this.listeningSocket = ws;
        ws.on("connect", () => {
            this._listening.next(true);
        });
        ws.on("disconnect", () => {
            this.append("output", "\n  Socket disconnected")
            this._listening.next(false);
        });

        const readData = (data): string => (data instanceof ArrayBuffer) ? Converter.stringifyArrayBuffer(data) : data;
        ws.on("stdout", data => {
            this.append("output", readData(data));
        });
        ws.on("stderr", data => {
            this.append("error", readData(data));
        });
    }

    public isListening(): boolean {
        return this._listening.getValue();
    }

    public listening(): Observable<boolean> {
        return this._listening.asObservable();
    }

    public lines(): Observable<TextPart[][]> {
        return this._lines.asObservable();
    }

    public enter(data: string) {
        this.append("input", data);
        this.listeningSocket!.emit("stdin", data);
    }

    private append(type: TextPartType, text: string) {
        if (isBlank(text)) return;

        const currentLines = this._lines.getValue();
        const lines = text.split(/\r?\n|\r/g);

        if (currentLines.length > 0) {
            currentLines[currentLines.length - 1].push({type, text: lines[0]});
        } else {
            currentLines.push([{type, text: lines[0]}]);
        }

        for (let i = 1; i < lines.length; i++) {
            currentLines.push([{type, text: lines[i]}]);
        }
    }

    public stopListening() {
        this.listeningSocket!.close();
    }
}

export type TextPartType = "output" | "input" | "error";

export interface TextPart {

    type: TextPartType;

    text: string;

}