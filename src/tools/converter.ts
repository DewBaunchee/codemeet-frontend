import {isBlank} from "./util-functions";
import arrayBufferToString from "arraybuffer-to-string";

const Converter = {

    convertImage: (buffer: any): string | undefined => {
        if (isBlank(buffer?.data)) return undefined;
        return `data:image/jpeg;base64,${btoa(String.fromCharCode(...buffer.data))}`;
    },

    stringifyArrayBuffer(arrayBuffer: ArrayBuffer): string {
        return arrayBufferToString(arrayBuffer);
    },
};

export default Converter;
