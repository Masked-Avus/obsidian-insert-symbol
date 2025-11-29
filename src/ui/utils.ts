export enum CssClass {
    MODAL = "plugin-modal",
    TABLE = "symbol-table",
    TITLE_HEADING = "title-heading",
    TABLE_CELL = "symbol-table-cell",
    SELECTED_TABLE_CELL = "selected-symbol-table-cell"
}

export enum Icon {
    SWATCH_BOOK = "swatch-book",
    TABLE = "table"
}

export function swapOutClass(element: HTMLElement, classToRemove: string, classToAdd: string): void {
    element.removeClass(classToRemove);
    element.addClass(classToAdd);
}

export function overwriteTableRow(row: HTMLTableRowElement, symbols: string[]): void {
    if (row.cells.length !== symbols.length) {
        console.error(`Unequal number of row cells (${row.cells.length}) and available recent symbols (${symbols.length}).`);
        return;
    }

    for (let i = 0; i < symbols.length; i++) {
        row.cells.item(i)?.setText(symbols[i]);
    }
}
