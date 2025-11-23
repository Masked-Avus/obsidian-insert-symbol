import { App, Editor, SuggestModal } from "obsidian";
import InsertSymbolPlugin from "src/main";
import SymbolGroup from "src/symbols/symbol-group";
import SymbolInsertionModal from "./symbol-insertion-modal";

export default class SymbolGroupSearchModal extends SuggestModal<SymbolGroup> {
    private static readonly TITLE: string = "Symbol Group Search";

    private readonly plugin: InsertSymbolPlugin;
    private readonly symbolGroups: SymbolGroup[];
    private readonly editor: Editor;
    
    constructor(plugin: InsertSymbolPlugin, app: App, editor: Editor) {
        super(app);

        this.plugin = plugin;
        this.editor = editor;
        this.symbolGroups = this.plugin.symbolGroups.getArrayCopy();
        this.symbolGroups.push(this.plugin.settings.customSymbolGroup);
        this.symbolGroups.push(this.plugin.settings.favoriteSymbols);
        this.symbolGroups.push(this.plugin.settings.recentSymbols);
        
        this.symbolGroups.sort(
            (a: SymbolGroup, b: SymbolGroup): number => a.name.localeCompare(b.name)
        );
        
        this.setTitle(SymbolGroupSearchModal.TITLE);
    }

    getSuggestions(query: string): SymbolGroup[] | Promise<SymbolGroup[]> {
        return this.symbolGroups.filter(
            (symbolGroup) => symbolGroup.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    renderSuggestion(value: SymbolGroup, element: HTMLElement): void {
        element.createEl("div", { text: value.name });
    }

    onChooseSuggestion(item: SymbolGroup, evt: MouseEvent | KeyboardEvent): void {
        new SymbolInsertionModal(this.plugin, this.editor, item, item.name).open();
    }
}
