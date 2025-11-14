import { Modal } from "obsidian";
import { CssClass } from "../utils";
import InsertSymbolPlugin from "../../main";
import SymbolTableDisplay from "../table-display";
import SymbolTableCollection from "../table-collection";
import StaticTable from "../elements/static-table";
import SelectableCell from "../elements/selectable-cell";
import StaticTableFactory from "../factories/static-table-factory";

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

    onOpen(): void {
        this.initializeContainer();
        
        this.assignmentTable = new InsertionCommandsAssignmentTable(this.plugin, this.container);
        
        this.symbolTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            async (cell: HTMLTableCellElement, symbol: string) => {
                await this.assignmentTable.updateSettings(symbol);
            }
        );
    }

    onClose(): void {
        this.contentEl.empty();
    }

    private initializeContainer(): void {
        this.container = this.contentEl;
        this.container.empty();
        this.container.addClass(CssClass.MODAL);
    }
}

class InsertionCommandsAssignmentTable {
    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private currentCell: SelectableCell = new SelectableCell();
    private display: SymbolTableDisplay;

    constructor(
        plugin: InsertSymbolPlugin,
        container: HTMLElement,
        ) {
        
        this.container = container;
        this.plugin = plugin;
        this.display = new SymbolTableDisplay(
            this.container,
            this.plugin.settings.favoriteSymbols,
            (cell: HTMLTableCellElement) => {
                this.selectCell(cell);
            },
            new StaticTableFactory()
        );
    }

    async updateSettings(symbol: string): Promise<void> {
        const symbols = this.plugin.settings.favoriteSymbols.symbols;

        if (this.currentCell.isSelected()) {
            this.currentCell.setText(symbol);

            const text = this.currentCell.getText();

            if (text !== undefined) {
                this.plugin.settings.favoriteSymbols.symbols[this.findCellIndex()] = text;
            }

            await this.plugin.saveSettings();
            this.unselectCell();
        }
    }

    selectCell(cell: HTMLTableCellElement): void {
        this.currentCell.select(cell);
    }

    unselectCell(): void {
        this.currentCell.unselect();
    }

    private findCellIndex(): number {
        if (this.currentCell === null) {
            throw new Error("Cannot find cell because no cell has been selected");
        }

        let columnIndex = -1;

        for (let i = 0; i < StaticTable.MAXIMUM_COLUMNS; i++) {
            const cell = this.display.getCell(0, i);
            
            if ((cell !== null) && this.currentCell.equals(cell)) {
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
