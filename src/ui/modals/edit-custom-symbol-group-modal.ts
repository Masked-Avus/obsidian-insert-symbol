import { Modal, Setting } from "obsidian";
import { CssClass, Icon } from "../utils";
import InsertSymbolPlugin from "src/main";
import SymbolTableDisplay from "../table-display";
import SymbolTableCollection from "../table-collection";
import SelectableCell from "../elements/selectable-cell";
import DynamicTableFactory from "../factories/dynamic-table-factory";
import TableHeading from "../elements/heading";
import Table from "../elements/table";
import DynamicTable from "../elements/dynamic-table";

export default class EditCustomSymbolGroupModal extends Modal {
    private static readonly TITLE: string = "Edit Custom Symbol Table";

    private readonly plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private customTable: CustomSymbolTable;
    private builtinTables: SymbolTableCollection;

    constructor(plugin: InsertSymbolPlugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.setTitle(EditCustomSymbolGroupModal.TITLE);
    }

    onOpen(): void {
        this.initializeContainer();
        this.addClearTableButton();

        this.customTable = new CustomSymbolTable(this.container, this.plugin);

        this.builtinTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            async (cell: HTMLTableCellElement, symbol: string) => {
                if (this.customTable.hasSelectionMade() && !this.customTable.hasValue(cell.getText())) {
                   this.customTable.setCell(cell); 
                }
                else {
                    this.customTable.add(cell.getText());
                }

                await this.customTable.updateSettings();
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

    private addClearTableButton(): void {
        new Setting(this.container)
            .setName("Clear table")
            .addButton(button => button
                .setIcon(Icon.TRASH)
                .onClick(async () => {
                    this.customTable.clear();
                    await this.plugin.saveSettings();
                }
            )
        );
    }
}

class CustomSymbolTable {
    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private currentCell: SelectableCell = new SelectableCell();
    private display: SymbolTableDisplay;
    private tableRef: DynamicTable;

    constructor(container: HTMLElement, plugin: InsertSymbolPlugin) {
        this.container = container;
        this.plugin = plugin;
        this.display = new SymbolTableDisplay(
            this.container,
            this.plugin.settings.customSymbolGroup,
            async (cell: HTMLTableCellElement, symbol: string) => {
                if (this.tableRef === undefined) {
                    return;
                }
                else if (!this.currentCell.isSelected()) {
                    this.currentCell.select(cell);
                    return;
                }

                if (!this.currentCell.equals(cell)) {
                    const cellRef = this.currentCell.getRef();

                    if (cellRef === null) {
                        return;
                    }

                    this.tableRef.swapCellSymbols(cellRef, cell);
                }
                else {
                    this.tableRef.removeCell(cell);
                }

                await this.updateSettings();
                this.currentCell.unselect();
            },
            new DynamicTableFactory(),
            this.plugin.settings.collapseTablesByDefault,
            // This is a bit of a hack so I can get access to the DynamicTable's specialized functionality.
            (heading: TableHeading, table: Table) => {
                if (table instanceof DynamicTable) {
                    this.tableRef = table;
                }
                else {
                    console.error("Expected DynamicTable but got another Table-derived type instead");
                }
            }
        );
    }

    async updateSettings(): Promise<void> {
        if (this.tableRef === undefined) {
            return;
        }

        this.plugin.settings.customSymbolGroup.symbols.length = 0;
        
        let rowIndex = 0;
        let currentRow = this.tableRef.getRow(rowIndex);
        
        while (currentRow !== null) {
            for (let cellIndex = 0; cellIndex < currentRow.cells.length; cellIndex++) {
                const cell = currentRow.cells.item(cellIndex);

                if (cell !== null) {
                    this.plugin.settings.customSymbolGroup.symbols.push(cell.getText());
                }
            }
            
            rowIndex++;
            currentRow = this.tableRef.getRow(rowIndex);
        }
         
        await this.plugin.saveSettings();
    }

    hasSelectionMade(): boolean {
        return this.currentCell.isSelected();
    }

    setCell(cell: HTMLTableCellElement): void {
        if (!this.currentCell.isSelected()) {
            return;
        }

        this.currentCell.setText(cell.getText());
        this.currentCell.unselect();
    }


    hasValue(symbol: string): boolean {
        let rowIndex = 0;
        let row = this.display.getRow(rowIndex);
        
        while (row !== null) {
            const cells = row.cells;

            for (let i = 0; i < cells.length; i++) {
                const cell = cells.item(i);

                if (cell === null) {
                    continue;
                }
                else if (cell.getText() === symbol) {
                    return true;
                }
            }

            rowIndex++;
            row = this.display.getRow(rowIndex);
        }

        return false;
    }

    add(symbol: string): void {
        this.tableRef?.addCell(symbol);
    }

    clear(): void {
        this.currentCell.unselect();
        this.tableRef?.clearCells();
        this.plugin.settings.customSymbolGroup.symbols.length = 0;
    }
}
