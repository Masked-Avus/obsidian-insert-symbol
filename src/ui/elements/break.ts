import Displayable from "./displayable";

export default class Break implements Displayable {
    private readonly breakRef: HTMLBRElement;

    constructor(container: HTMLElement) {
        this.breakRef = container.createEl("br");
    }

    display(): void {
        this.breakRef.hidden = false;
    }

    hide(): void {
        this.breakRef.hidden = true;
    }

    isHidden(): boolean {
        return this.breakRef.hidden;
    }
}
