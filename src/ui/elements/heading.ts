import {
    CssClass,
    UiEvent
} from "../utils";

import Displayable from "./displayable";

export default class TableHeading {
    private readonly headingRef: HTMLHeadingElement;
    private readonly title: string;
    private readonly description?: string;
    private readonly displayables: Displayable[] = [];

    constructor(container: HTMLElement, title: string, description?: string) {
        this.title = title;
        this.description = description;

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

        if (this.description !== undefined) {
            this.setDescription(this.description);
        }
    }

    addListener(displayable: Displayable): void {
        this.displayables.push(displayable);
    }

    private setDescription(description: string): void {
        setTitle(this.headingRef, description);
    }
}

function setTitle(element: HTMLElement, value: string): void {
    element.setAttribute("title", value);
}
