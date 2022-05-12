export const PhotoImportService = {

    input(): HTMLInputElement {
        return document.getElementById("file-input") as HTMLInputElement;
    },

    import(extensions?: string[]): Promise<FileList | null> {
        this.input().accept = (extensions || []).join(", ");
        this.input().click();
        return new Promise<FileList | null>(resolve => {
            this.input().onchange = (() => {
                resolve(this.input()?.files);
            });
        });
    },

};