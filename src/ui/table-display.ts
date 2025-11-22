import Break from "./elements/break";
import Table from "./elements/table";
import TableHeading from "./elements/heading";
import TableFactory from "./factories/types";
import SymbolGroup from "src/symbols/internal-symbol-group";

export default class SymbolTableDisplay {
    private readonly heading: TableHeading;
    private readonly table: Table;
    private readonly break: Break;

    constructor(
        container: HTMLElement,
        symbols: SymbolGroup,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void,
        tableFactory: TableFactory,
        onElementsCreatedCallback?: (heading: TableHeading, table: Table) => void
        ) {

        container = container;
        this.heading = new TableHeading(container, symbols.name);
        this.table = tableFactory.createTable(container, symbols.symbols, onClickCallback);
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
