import {
    Utf16Symbol
} from "src/symbol/types";

import Break from "./element/break";
import Table from "./element/table";
import TableHeading from "./element/heading";

export default class SymbolTableDisplay {
    private readonly heading: TableHeading;
    private readonly table: Table;
    private readonly break: Break;

    constructor(
        container: HTMLElement,
        symbols: Utf16Symbol[],
        title: string,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void,
        description?: string
        ) {

        container = container;
        this.heading = new TableHeading(container, title, description);
        this.table = new Table(container, symbols, onClickCallback);
        this.break = new Break(container);

        this.heading.addListener(this.table);
        this.heading.addListener(this.break);
    }

    getCell(rowIndex: number, columnIndex: number): HTMLTableCellElement | null {
        return this.table.getCell(rowIndex, columnIndex);
    }

    getRow(rowIndex: number): HTMLTableRowElement {
        return this.table.getRow(rowIndex);
    }
}
