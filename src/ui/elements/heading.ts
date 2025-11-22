import { CssClass, UiEvent } from "../utils";
import Displayable from "./displayable";

export default class TableHeading {
    private readonly headingRef: HTMLHeadingElement;
    private readonly title: string;
    private readonly displayables: Displayable[] = [];

    constructor(container: HTMLElement, title: string) {
        this.title = title;

        this.headingRef = container.createEl("h4");
        this.headingRef.setText(this.title);
        this.headingRef.addClass(CssClass.TITLE_HEADING);
        this.headingRef.addEventListener(UiEvent.CLICK, () => {
            for (const displayable of this.displayables) {
                if (displayable.isHidden()) {
                    displayable.display();
                }
                else {
                    displayable.hide();
                }
            }
        });
    }

    addListener(displayable: Displayable): void {
        this.displayables.push(displayable);
    }
}
