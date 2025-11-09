import {
    CssClass,
    UiEvent
} from "../utils";

import { Utf16Symbol } from "src/symbol/types";
import Table from "./table";

type CellPosition = {
    row: number;
    column: number;
};

export default class DynamicTable extends Table {
    // Just in case I need them (delete them if I don't).
    public static readonly MAX_CELLS = 200;
    private cellCount: number;

    constructor(
        container: HTMLElement,
        contents: Utf16Symbol[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {
        
        super(container, contents, onClickCallback);
    }

    addCell(symbol: string): void {
        if (this.containsSymbol(symbol)) {
            return;
        }

        const lastRow = this.tableRef.rows.item(this.tableRef.rows.length - 1);

        if ((lastRow === null) || (lastRow.cells.length === DynamicTable.MAX_COLUMNS)) {
            this.appendNewRow(symbol);
        }
    }

    removeCell(cell: HTMLTableCellElement): void {
        const position = this.findCell(cell);

        if (position === null) {
            return;
        }

        this.shiftAllSymbolsForward(position);
        this.removeLastCell();
    }

    swapCellSymbols(first: HTMLTableCellElement, second: HTMLTableCellElement) {
        if ((first === second) || !this.containsCell(first) || !this.containsCell(second)) {
            return;
        }

        const temporary = first.getText();
        first.setText(second.getText());
        second.setText(temporary);
    }

    clearCells(): void {
        const rows = this.tableRef.rows;

        for (let i = (rows.length - 1); i >= 0; i--) {
            const row = rows.item(i);
            row?.remove();
        }
    }

    private appendNewRow(symbol: string): void {
        const row = this.tableRef.insertRow();
        const firstCell = row.insertCell();
        firstCell.addClass(CssClass.TABLE_CELL);
        firstCell.setText(symbol);

        firstCell.addEventListener(UiEvent.CLICK, () => {
            this.onCellClickCallback(firstCell, symbol);
        });
    }

    private containsCell(cell: HTMLTableCellElement): boolean {
        for (let i = 0; i < this.tableRef.rows.length; i++) {
            const row = this.tableRef.rows.item(i);

            if (row === null) {
                continue;
            }
            else if (this.matchCell(row, cell)) {
                return true;
            }
        }

        return false;
    }

    private containsSymbol(symbol: string): boolean {
        for (let i = 0; i < this.tableRef.rows.length; i++) {
            const row = this.tableRef.rows.item(i);

            if (row === null) {
                continue;
            }
            else if (this.matchSymbol(row, symbol)) {
                return true;
            }
        }

        return false;
    }

    private matchCell(row: HTMLTableRowElement, target: HTMLTableCellElement): boolean {
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells.item(i);

            if (cell === target) {
                return true;
            }
        }

        return false;
    }

    private matchSymbol(row: HTMLTableRowElement, target: string): boolean {
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells.item(i);

            if ((cell !== null) && (cell.getText() === target)) {
                return true;
            }
        }

        return false;
    }

    private findCell(cell: HTMLTableCellElement): CellPosition | null {
        for (let row = 0; row < this.tableRef.rows.length; row++) {
            const currentRow = this.tableRef.rows.item(row);

            if (currentRow === null) {
                continue;
            }

            const column = this.getCellIndex(cell, currentRow);

            if (column >= 0) {
                return {
                    row: row,
                    column: column
                };
            }
        }

        return null;
    }

    private getCellIndex(cell: HTMLTableCellElement, row: HTMLTableRowElement): number {
        for (let column = 0; row.cells.length; column++) {
            const currentCell = row.cells.item(column);

            if (currentCell === null) {
                continue;
            }
            else if (currentCell === cell) {
                return column;
            }
        }

        return -1;
    }

    private shiftSymbolsForwardInRow(
        currentRow: HTMLTableRowElement,
        nextRow: HTMLTableRowElement | null,
        startingIndex: number
        ): void {
        
        if ((startingIndex < 0) || (startingIndex >= currentRow.cells.length)) {
            return;
        }

        for (let i = 0; i < (currentRow.cells.length - 1); i++) {
            const currentCell = currentRow.cells.item(i);
            const nextCell = currentRow.cells.item(i + 1);

            if ((currentCell === null) || (nextCell === null)) {
                continue;
            }

            currentCell.setText(nextCell.getText());
        }

        if (nextRow !== null) {
            const lastCellOfCurrentRow = currentRow.cells.item(currentRow.cells.length - 1);
            const firstCellOfNextRow = nextRow.cells.item(0);

            if ((lastCellOfCurrentRow === null) || (firstCellOfNextRow === null)) {
                return;
            }

            lastCellOfCurrentRow.setText(firstCellOfNextRow.getText());
        }
    }

    private shiftAllSymbolsForward(startingPosition: CellPosition): void {
        let currentRow = this.tableRef.rows.item(startingPosition.row);

        if (currentRow === null) {
            return;
        }

        let nextRow = this.tableRef.rows.item(startingPosition.row + 1);
        this.shiftSymbolsForwardInRow(currentRow, nextRow, startingPosition.column);

        for (let i = startingPosition.row + 1; i < this.tableRef.rows.length; i++) {
            currentRow = this.tableRef.rows.item(i);
            nextRow = this.tableRef.rows.item(i + 1);

            if (currentRow === null) {
                continue;
            }

            this.shiftSymbolsForwardInRow(currentRow, nextRow, 0);
        }
    }

    private removeLastCell(): void {
        const lastRow = this.tableRef.rows.item(this.tableRef.rows.length - 1);

        if (lastRow === null) {
            return;
        }
        else if (lastRow.cells.length === 0) {
            lastRow.remove();
            return;
        }

        const lastCell = lastRow.cells.item(lastRow.cells.length - 1);

        if (lastCell === null) {
            return;
        }

        lastCell.remove();

        if (lastRow.cells.length === 0) {
            lastRow.remove();
        }
    }
}
