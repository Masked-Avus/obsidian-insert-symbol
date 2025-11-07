import logError from "src/logging";

export enum CssClass {
    MODAL = "plugin-modal",
    TABLE = "symbol-table",
    TITLE_HEADING = "title-heading",
    SETTINGS_HEADING = "settings-heading",
    TABLE_CELL = "symbol-table-cell",
    SELECTED_TABLE_CELL = "selected-symbol-table-cell",
    HELPER_TEXT = "helper-text",
}

export enum Icon {
    PLUS = "plus",
    TRASH = "trash-2",
    SWATCH_BOOK = "swatch-book",
    RESTORE = "archive-restore",
    DOWN = "chevron-down",
    UP = "chevron-up"
}

export enum UiEvent {
    CLICK = "click"
}

export function createParagraph(container: HTMLElement, text: string, className: string): HTMLParagraphElement {
    const paragraph = container.createEl("p");
    paragraph.setText(text);
    paragraph.addClass(className);
    return paragraph;
}

export function swapOutClass(element: HTMLElement, classToRemove: string, classToAdd: string): void {
    element.removeClass(classToRemove);
    element.addClass(classToAdd);
}

export function setCell(cell: HTMLTableCellElement, symbol: string): void {
    cell.setText(symbol);
}

export function overwriteTableRow(row: HTMLTableRowElement, symbols: string[]): void {
    if (row.cells.length !== symbols.length) {
        logError(new Error(`Unequal number of row cells (${row.cells.length}) and available recent symbols (${symbols.length}).`));
        return;
    }

    for (let i = 0; i < symbols.length; i++) {
        const cell = row.cells.item(i);
        
        if (cell !== null) {
            setCell(cell, symbols[i]);
        }
    }
}
