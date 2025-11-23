import { Editor, Modal } from "obsidian";
import { updateRecentSymbols } from "src/settings";
import InsertSymbolPlugin from "src/main";
import StaticTable from "src/ui/elements/static-table";
import SymbolGroup from "src/symbols/internal-symbol-group";

export default class SymbolInsertionModal extends Modal {
    private readonly plugin: InsertSymbolPlugin;
    private readonly editor: Editor;
    private readonly table: StaticTable;
    private readonly symbolGroup: SymbolGroup;
    private readonly title: string;
    private container: HTMLElement;

    constructor(plugin: InsertSymbolPlugin, editor: Editor, symbolGroup: SymbolGroup, title: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.editor = editor;
        this.symbolGroup = symbolGroup;
        this.title = title;
        this.setTitle(this.title);
    }

    onOpen(): void {
        this.initializeContainer();
        
        new StaticTable(
            this.container,
            this.symbolGroup.symbols,
            async (cell: HTMLTableCellElement, symbol: string) => {
                this.editor.replaceSelection(cell.getText());
                
                updateRecentSymbols(this.plugin.settings, symbol);

                await this.plugin.saveSettings();
                this.plugin.lastSymbol = symbol;
            }
        );
    }

    onClose(): void {
        this.contentEl.empty();
    }

    private initializeContainer(): void {
        this.container = this.contentEl;
        this.container.empty();
    }
}
