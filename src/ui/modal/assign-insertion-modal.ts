import {
    Modal
} from "obsidian";

import {
    SymbolTableCollection,
    SymbolTableDisplay,
} from "../table-display";

import {
    CssClass,
    setCell,
    swapOutClass
} from "../utils";

import InsertSymbolPlugin from "../../main";
import Table from "../element/table";

export default class AssignInsertionCommandsModal extends Modal {
    private static readonly TITLE: string = "Favorite Symbol Assignment";

    private plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private symbolTables: SymbolTableCollection;
    private assignmentTable: InsertionCommandsAssignmentTable;

    constructor(plugin: InsertSymbolPlugin) {
        super(plugin.app);
        this.plugin = plugin;

        this.setTitle(AssignInsertionCommandsModal.TITLE);
    }

    onOpen() {
        this.initializeContainer();
        
        this.assignmentTable = new InsertionCommandsAssignmentTable(this.plugin, this.container);
        
        this.symbolTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            async (cell: HTMLTableCellElement, symbol: string) => {
                await this.assignmentTable.update(symbol);
            }
        );
    }

    onClose() {
        this.cleanUpContainer();
    }

    private initializeContainer() {
        this.container = this.contentEl;
        this.container.empty();
        this.container.addClass(CssClass.MODAL);
    }

    private cleanUpContainer() {
        this.contentEl.empty();
    }
}

class InsertionCommandsAssignmentTable {
    private static readonly TITLE: string = "Assign Symbols to Commands";

    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private selectedCell: HTMLTableCellElement | null = null;
    private display: SymbolTableDisplay;

    constructor(
        plugin: InsertSymbolPlugin,
        container: HTMLElement,
        ) {
        
        this.container = container;
        this.plugin = plugin;

        this.display = new SymbolTableDisplay(
            this.container,
            this.plugin.settings.favoriteSymbols.symbols,
            InsertionCommandsAssignmentTable.TITLE,
            (cell: HTMLTableCellElement) => {
                this.selectCell(cell);
            }
        );
    }

    async update(symbol: string): Promise<void> {
        const symbols = this.plugin.settings.favoriteSymbols.symbols;

        if ((this.selectedCell !== null)) {
            setCell(this.selectedCell, symbol);

            this.plugin.settings.favoriteSymbols.symbols[this.findCellIndex()] = this.selectedCell.getText();

            await this.plugin.saveSettings();
            this.unselectCell();
        }
    }

    selectCell(cell: HTMLTableCellElement): void {
        if (this.selectedCell !== null) {
            this.unselectCell();
        }

        swapOutClass(cell, CssClass.TABLE_CELL, CssClass.SELECTED_TABLE_CELL);
        this.selectedCell = cell;
    }

    unselectCell(): void {
        if (this.selectedCell !== null) {
            swapOutClass(this.selectedCell, CssClass.SELECTED_TABLE_CELL, CssClass.TABLE_CELL);
            this.selectedCell = null;
        }
    }

    private findCellIndex(): number {
        if (this.selectedCell === null) {
            throw new Error("Cannot find cell because no cell has been selected");
        }

        let columnIndex = -1;

        for (let i = 0; i < Table.MAX_COLUMNS; i++) {
            const cell = this.display.getCell(0, i);
            
            if (cell === this.selectedCell) {
                columnIndex = i;
                break;
            }
        }

        if (columnIndex < 0) {
            throw new Error("Could not find target cell in insertion command assignment table");
        }

        return columnIndex;
    }
}
