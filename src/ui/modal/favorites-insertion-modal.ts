import {
    Editor,
    Modal
} from "obsidian";

import {
    updateRecentSymbols
} from "src/settings";

import InsertSymbolPlugin from "src/main";
import Table from "src/ui/element/table";

export default class InsertFavoriteSymbolModal extends Modal {
    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private editor: Editor;
    private table: Table;

    constructor(plugin: InsertSymbolPlugin, editor: Editor) {
        super(plugin.app);
        this.plugin = plugin;
        this.editor = editor;

        this.setTitle("Favorite Symbols");
    }

    onOpen(): void {
        this.initializeContainer();
        
        new Table(
            this.container,
            this.plugin.settings.favoriteSymbols.symbols,
            async (cell: HTMLTableCellElement, symbol: string) => {
                this.editor.replaceSelection(cell.getText());
                
                updateRecentSymbols(this.plugin.settings, symbol);

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
    }

    private cleanUpContainer(): void {
        this.contentEl.empty();
    }
}