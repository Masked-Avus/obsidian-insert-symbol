import {
    CssClass,
    UiEvent
} from "../utils";

import { Utf16Symbol } from "src/symbol/types";
import Displayable from "./displayable";

export default abstract class Table implements Displayable {
    public static readonly MAX_COLUMNS = 10;

    private readonly container: HTMLElement;
    private readonly internalOnCellClickCallback: (cell: HTMLTableCellElement, symbol: string) => void;
    private internalTableRef: HTMLTableElement;

    constructor(
        container: HTMLElement,
        contents: Utf16Symbol[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {

        this.container = container;
        this.internalOnCellClickCallback = onClickCallback;
        this.build(contents);
    }

    getRow(index: number): HTMLTableRowElement | null {
        return this.internalTableRef.rows.item(index);
    }

    getCell(rowIndex: number, columnIndex: number): HTMLTableCellElement | null {
        return this.internalTableRef.rows[rowIndex].cells.item(columnIndex);
    }

    isHidden(): boolean {
        return this.internalTableRef.hidden;
    }

    display(): void {
        this.internalTableRef.hidden = false;
    }

    hide(): void {
        this.internalTableRef.hidden = true;
    }

    protected get tableRef(): HTMLTableElement {
        return this.internalTableRef;
    }

    protected get onCellClickCallback(): (cell: HTMLTableCellElement, symbol: string) => void {
        return this.internalOnCellClickCallback;
    }

    private build(symbols: Utf16Symbol[]): void {
        this.internalTableRef = this.container.createEl("table");
        this.internalTableRef.addClass(CssClass.TABLE);

        if (symbols.length === 0) {
            return;
        }
        
        let cellPosition = 1;
        let row = this.internalTableRef.insertRow();

        for (let i = 0; i < symbols.length; i++) {
            if (cellPosition > Table.MAX_COLUMNS) {
                row = this.internalTableRef.insertRow();
                cellPosition = 1;
            }
            
            const cell = row.insertCell();
            cell.addClass(CssClass.TABLE_CELL);

            const symbol = symbols[i];
            cell.setText(symbol);
            
            cell.addEventListener(UiEvent.CLICK, () => {
                this.internalOnCellClickCallback(cell, symbol);
            });

            cellPosition++;
        }
    }
}
