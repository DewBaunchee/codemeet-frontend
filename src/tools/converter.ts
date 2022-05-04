const ImageConverter = {

    convert: (buffer: Buffer): string => `data:image/png;base64,${buffer?.toString("base64")}`,

};

export default ImageConverter;
