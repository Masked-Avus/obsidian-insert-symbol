import {
    CssClass,
    setCell,
    UiEvent
} from "../utils";

import Displayable from "./displayable";

export default class Table implements Displayable {
    public static readonly MAX_COLUMNS = 10;

    private readonly container: HTMLElement;
    private readonly onCellClickCallback: (cell: HTMLTableCellElement, symbol: string) => void;
    private tableRef: HTMLTableElement;

    constructor(
        container: HTMLElement,
        contents: string[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {

        this.container = container;
        this.onCellClickCallback = onClickCallback;

        this.build(contents);
    }

    getRow(index: number): HTMLTableRowElement {
        return this.tableRef.rows[index];
    }

    getCell(rowIndex: number, columnIndex: number): HTMLTableCellElement | null {
        return this.tableRef.rows[rowIndex].cells.item(columnIndex);
    }

    isHidden(): boolean {
        return this.tableRef.hidden;
    }

    display(): void {
        this.tableRef.hidden = false;
    }

    hide(): void {
        this.tableRef.hidden = true;
    }

    private build(symbols: string[]): void {
        this.tableRef = this.container.createEl("table");
        this.tableRef.addClass(CssClass.TABLE);
        
        let cellPosition = 1;
        let row = this.tableRef.insertRow();

        for (let i = 0; i < symbols.length; i++) {
            if (cellPosition > Table.MAX_COLUMNS) {
                row = this.tableRef.insertRow();
                cellPosition = 1;
            }
            
            const cell = row.insertCell();
            cell.addClass(CssClass.TABLE_CELL);

            const symbol = symbols[i];
            setCell(cell, symbol);
            
            cell.addEventListener(UiEvent.CLICK, () => {
                this.onCellClickCallback(cell, symbol);
            });
            
            cellPosition++;
        }
    }
}
