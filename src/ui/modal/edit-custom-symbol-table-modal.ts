import {
    Modal,
    Setting
} from "obsidian";

import {
    createParagraph,
    CssClass,
    Icon,
    swapOutClass
} from "../utils";

import {
    SymbolTableCollection,
    SymbolTableDisplay
} from "../table-display";

import {
    CustomSymbolGroupData
} from "src/symbol/custom-symbol-group";

import InsertSymbolPlugin from "src/main";

export default class EditCustomSymbolGroupModal extends Modal {
    private static readonly TITLE: string = "Edit Custom Symbol Table";

    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private customTable: CustomSymbolTable;
    private builtinTables: SymbolTableCollection;
    // TODO: Reference to table.

    constructor(plugin: InsertSymbolPlugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.setTitle(EditCustomSymbolGroupModal.TITLE);
    }

    onOpen() {
        this.initializeContainer();
        this.addClearTableButton();
        // TODO: Put in instructions
        createParagraph(this.container, "Instructions on how to use editing table go here", CssClass.HELPER_TEXT);

        this.customTable = new CustomSymbolTable(this.container, this.plugin);

        this.builtinTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            (cell: HTMLTableCellElement, symbol: string) => {
                // TEMP
                console.log("built-in table cell clicked");
            }
        );
        
        // TODO: Crate all internal symbol tables
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

    private addClearTableButton() {
        new Setting(this.container)
            .setName("Clear table")
            .addButton(button => button
                .setIcon(Icon.TRASH)
                .onClick(() => {
                    // TEMP
                    console.log("Clearing custom table has not been implemented yet");
                }
            )
        );
    }
}

class CustomSymbolTable {
    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private selectedCell: HTMLTableCellElement | null = null;
    private display: SymbolTableDisplay;

    constructor(container: HTMLElement, plugin: InsertSymbolPlugin) {
        this.container = container;
        this.plugin = plugin;
        this.display = new SymbolTableDisplay(
            this.container,
            this.customSymbols.symbols,
            this.customSymbols.name,
            (cell: HTMLTableCellElement) => {
                this.selectCell(cell);
            },
            this.customSymbols.description
        );
    }

    async update(): Promise<void> {
        // TODO
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

    private get customSymbols(): CustomSymbolGroupData {
        return this.plugin.settings.customSymbolGroup;
    }
}
