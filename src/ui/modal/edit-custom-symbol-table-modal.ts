import {
    Modal,
    Setting
} from "obsidian";

import {
    createParagraph,
    CssClass,
    Icon
} from "../utils";

import {
    CustomSymbolGroupData
} from "src/symbol/custom-symbol-group";

import InsertSymbolPlugin from "src/main";
import SymbolTableDisplay from "../table-display";
import SymbolTableCollection from "../table-collection";
import SelectableCell from "../element/selectable-cell";

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
    private currentCell: SelectableCell = new SelectableCell();
    private display: SymbolTableDisplay;

    constructor(container: HTMLElement, plugin: InsertSymbolPlugin) {
        this.container = container;
        this.plugin = plugin;
        this.display = new SymbolTableDisplay(
            this.container,
            this.customSymbols.symbols,
            this.customSymbols.name,
            (cell: HTMLTableCellElement) => {
                // 1. If [this.currentCell] is selected already, swap the text of [cell] and [this.currentCell]; then, [this.currentCell.unselect()] and exit callback.
                // 2. Otherwise, perform the following.
                this.selectCell(cell);
            },
            this.customSymbols.description
        );
    }

    async update(): Promise<void> {
        // TODO
    }

    selectCell(cell: HTMLTableCellElement): void {
        this.currentCell.select(cell);
    }

    unselectCell(): void {
        this.currentCell.unselect();
    }

    private get customSymbols(): CustomSymbolGroupData {
        return this.plugin.settings.customSymbolGroup;
    }
}
