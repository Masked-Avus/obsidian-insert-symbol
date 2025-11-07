import {
    Utf16Symbol
} from "src/symbol/types";

import Break from "./element/break";
import Table from "./element/table";
import TableHeading from "./element/heading";
import InternalSymbolGroup from "src/symbol/internal-symbol-group";
import InsertSymbolPlugin from "../main";

export class SymbolTableCollection {
    private plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void;

    constructor(
        container: HTMLElement,
        plugin: InsertSymbolPlugin,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {
        
        this.plugin = plugin;
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.build();
    }

    private build(): void {
        const symbolGroups = this.plugin.symbolGroups.symbolGroups;

        for (let i = 0; i < symbolGroups.length; i++) {
            const group = this.plugin.symbolGroups.getSymbols(symbolGroups[i]);

            if ((group !== undefined) && (group.getCount() > 0)) {
                this.addSymbolTable(group);
            }
        }
    }

    private addSymbolTable(symbolGroup: InternalSymbolGroup): void {
        new SymbolTableDisplay(
            this.container,
            symbolGroup.getSymbols(),
            symbolGroup.getName(),
            this.onClickCallback,
            symbolGroup.getDescription()
        );
    }
}

export class SymbolTableDisplay {
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

