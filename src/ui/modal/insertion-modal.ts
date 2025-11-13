import {
    Modal,
    Editor
} from "obsidian";

import {
    CssClass,
    overwriteTableRow
} from "../utils";

import { updateRecentSymbols } from "../../settings";
import InsertSymbolPlugin from "../../main";
import SymbolTableDisplay from "../table-display";
import SymbolTableCollection from "../table-collection";
import StaticTableFactory from "../factory/static-table-factory";

export default class InsertSymbolModal extends Modal {
    private static readonly TITLE = "Symbol Inserter";

    private readonly plugin: InsertSymbolPlugin;
    private readonly editor: Editor;
    private container: HTMLElement;
    private recentSymbols: RecentSymbolsTable;
    private symbolTables: SymbolTableCollection;

    constructor(plugin: InsertSymbolPlugin, editor: Editor) {
        super(plugin.app);
        this.plugin = plugin;
        this.editor = editor;

        this.setTitle(InsertSymbolModal.TITLE);
    }

    onOpen(): void {
        this.initializeContainer();

        this.recentSymbols = new RecentSymbolsTable(
            this.plugin,
            this.container,
            this.editor
        );
        
        this.symbolTables = new SymbolTableCollection(
            this.container,
            this.plugin,
            async (cell: HTMLTableCellElement, symbol: string) => {
                this.editor.replaceSelection(cell.getText());
                this.recentSymbols.update(symbol);
                await this.plugin.saveSettings();
                this.plugin.settings.lastSymbol = symbol;
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
}

class RecentSymbolsTable {
    private plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private editor: Editor;
    private display: SymbolTableDisplay;

    constructor(plugin: InsertSymbolPlugin, containerElement: HTMLElement, editor: Editor) {
        this.plugin = plugin;
        this.container = containerElement;
        this.editor = editor;

        this.display = new SymbolTableDisplay(
            this.container,
            this.plugin.settings.recentSymbols,
            async (cell: HTMLTableCellElement, symbol: string) => {
                this.editor.replaceSelection(cell.getText());
                this.plugin.settings.lastSymbol = symbol;
            },
            new StaticTableFactory()
        );
    }

    async update(symbol: string): Promise<void> {
        const recentSymbols = this.plugin.settings.recentSymbols.symbols;
        let found = false;

        for (let i = 0; i < recentSymbols.length; i++) {
            const recentSymbol = recentSymbols[i];

            if (symbol === recentSymbol) {
                found = true;
                break;
            }
        }

        if (!found) {
            updateRecentSymbols(this.plugin.settings, symbol);

            const firstRow = this.display.getRow(0);

            if (firstRow !== null) {
                overwriteTableRow(firstRow, recentSymbols);
            }
        }
    }
}
