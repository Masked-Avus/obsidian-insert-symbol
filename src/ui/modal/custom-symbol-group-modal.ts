import {
    Editor,
    Modal
} from "obsidian";

import { updateRecentSymbols } from "src/settings";
import InsertSymbolPlugin from "src/main";
import StaticTable from "src/ui/element/static-table";

export default class CustomSymbolGroupModal extends Modal {
    private static readonly TITLE: string = "Custom Symbol Group";
    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    private editor: Editor;
    private table: StaticTable;

    constructor(plugin: InsertSymbolPlugin, editor: Editor) {
        super(plugin.app);
        this.plugin = plugin;
        this.editor = editor;

        this.setTitle(CustomSymbolGroupModal.TITLE);
    }

    onOpen(): void {
        this.initializeContainer();
        
        new StaticTable(
            this.container,
            this.plugin.settings.customSymbolGroup.symbols,
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