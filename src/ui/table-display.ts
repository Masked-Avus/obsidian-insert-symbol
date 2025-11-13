import { Utf16Symbol } from "src/symbol/types";
import Break from "./element/break";
import Table from "./element/table";
import TableHeading from "./element/heading";
import TableFactory from "./factory/types";

export default class SymbolTableDisplay {
    private readonly heading: TableHeading;
    private readonly table: Table;
    private readonly break: Break;

    constructor(
        container: HTMLElement,
        symbols: Utf16Symbol[],
        title: string,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void,
        tableFactory: TableFactory,
        description?: string,
        onElementsCreatedCallback?: (heading: TableHeading, table: Table) => void
        ) {

        container = container;
        this.heading = new TableHeading(container, title, description);
        this.table = tableFactory.createTable(container, symbols, onClickCallback);
        this.break = new Break(container);

        this.heading.addListener(this.table);
        this.heading.addListener(this.break);

        if (onElementsCreatedCallback !== undefined) {
            onElementsCreatedCallback(this.heading, this.table);
        }
    }

    getCell(rowIndex: number, columnIndex: number): HTMLTableCellElement | null {
        return this.table.getCell(rowIndex, columnIndex);
    }

    getRow(rowIndex: number): HTMLTableRowElement | null {
        return this.table.getRow(rowIndex);
    }
}
