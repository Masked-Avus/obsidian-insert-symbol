import {
    Modal,
    Setting
} from "obsidian";

import {
    createParagraph,
    CssClass,
    Icon
} from "../utils";

import InsertSymbolPlugin from "src/main";
import SymbolTableDisplay from "../table-display";
import SymbolTableCollection from "../table-collection";
import SelectableCell from "../element/selectable-cell";
import DynamicTableFactory from "../factory/dynamic-table-factory";
import TableHeading from "../element/heading";
import Table from "../element/table";
import DynamicTable from "../element/dynamic-table";

export default class EditCustomSymbolGroupModal extends Modal {
    private static readonly TITLE: string = "Edit Custom Symbol Table";

    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
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

        // TODO: Perhaps have the instructions on how to use the custom symbol table in the README instead,
        //       since that is where one goes to learn how to use a plugin.
        createParagraph(
            this.container,
            "1. To add a unique symbol to the custom table, click on one of the other tables below.",
            CssClass.HELPER_TEXT
        );
        createParagraph(
            this.container,
            "2. To delete a symbol from the custom table, click on it twice.",
            CssClass.HELPER_TEXT
        );
        createParagraph(
            this.container, 
            "3. To swap the positions of two symbols in the custom table, click on ",
            CssClass.HELPER_TEXT
        );

        this.customTable = new CustomSymbolTable(this.container, this.plugin);

        this.builtinTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            (cell: HTMLTableCellElement, symbol: string) => {
                this.customTable.add(cell.getText());
            }
        );
    }

    onClose(): void {
        this.cleanUpContainer();
    }

    private initializeContainer(): void {
        this.container = this.contentEl;
        this.container.empty();
        this.container.addClass(CssClass.MODAL);
    }

    private cleanUpContainer(): void {
        this.contentEl.empty();
    }

    private addClearTableButton(): void {
        new Setting(this.container)
            .setName("Clear table")
            .addButton(button => button
                .setIcon(Icon.TRASH)
                .onClick(() => {
                    this.customTable.clear();
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
            this.plugin.settings.customSymbolGroup.symbols,
            this.plugin.settings.customSymbolGroup.name,
            (cell: HTMLTableCellElement, symbol: string) => {
                if (this.tableRef === undefined) {
                    return;
                }
                else if (!this.currentCell.isSelected()) {
                    this.selectCell(cell);
                    return;
                }

                if (!this.currentCell.equals(cell)) {
                    const cellRef = this.currentCell.getRef();

                    if (cellRef === null) {
                        return;
                    }

                    console.log(`symbols ${this.currentCell.getText()} and ${cell.getText()} swapped`);
                    // Swap text of [cell] and [this.currentCell].
                    //this.tableRef.swapCellSymbols(cellRef, cell);
                }
                else {
                    console.log(`symbol ${cell.getText()} deleted`);
                    // Delete [cell] and adjust table.
                    //this.tableRef.removeCell(cell);
                }

                this.currentCell.unselect();
            },
            new DynamicTableFactory(),
            this.plugin.settings.customSymbolGroup.description,
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

    async update(): Promise<void> {
        if (this.tableRef === undefined) {
            return;
        }

        // TODO
        // 1. Clear [this.plugin.settings.customSymbolGroup.symbols].
        // 2. Iterate through [this.tableRef]'s rows.
        // 3. Iterate through each row, pushing its texst value to [this.plugin.settings.customSymbolGroup.symbols].
        // 4. Save settings.
    }

    selectCell(cell: HTMLTableCellElement): void {
        this.currentCell.select(cell);
    }

    unselectCell(): void {
        this.currentCell.unselect();
    }

    add(symbol: string): void {
        console.log(`symbol ${symbol} added to custom table`);
        //this.tableRef?.addCell(symbol);
    }

    clear(): void {
        console.log("Clearing custom table has not been implemented yet");
        //this.tableRef?.clearCells();
    }
}
