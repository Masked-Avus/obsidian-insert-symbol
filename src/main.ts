import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { InsertSymbolPluginSettings, InsertSymbolPluginSettingTab, DEFAULT_SETTINGS, cleanSettings } from "./settings";
import { Utf16Symbol } from "./symbols/types";
import SymbolCollection from "./symbols/symbol-collection";
import BuiltinSymbolsInsertionModal from "./ui/modals/builtin-symbols-insertion-modal";
import DEFAULT_SYMBOLS from "./symbols/default-symbols";
import SymbolInsertionModal from "./ui/modals/symbol-insertion-modal";
import SymbolGroupSearchModal from "./ui/modals/symbol-group-search-modal";

export default class InsertSymbolPlugin extends Plugin {
    private static readonly FAVORITE_SYMBOL_INSERTION_COMMAND_COUNT: number = 10;

    readonly symbolGroups = new SymbolCollection();
    settings: InsertSymbolPluginSettings;
    lastSymbol: Utf16Symbol = "";

    async onload(): Promise<void> {
        await this.loadSettings();

        if (!this.loadSymbols()) {
            return;
        }

        this.addOpenSymbolInsertionModalCommand();
        this.addOpenFavoriteSymbolsInsertionModalCommand();
        this.addOpenCustomSymbolGroupModalCommand();
        this.addFavoriteSymbolCommands();
        this.addInsertMostRecentSymbolCommand();
        this.addSearchForSymbolGroupCommand();
        this.addSettingTab(new InsertSymbolPluginSettingTab(this.app, this));
    }
    
    async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        cleanSettings(this.settings);
        await this.saveSettings();
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }

    private loadSymbols(): boolean {
        try {
            for (const symbolGroup of DEFAULT_SYMBOLS) {
                this.symbolGroups.addSymbols(symbolGroup);
            }

            return true;
        }
        catch (error) {
            new Notice("Error encountered when loading symbols");
            new Notice("Symbols will not be loaded");
            console.error(error.message);
            return false;
        }
    }

    private addOpenSymbolInsertionModalCommand(): void {
        this.addCommand({
            id: "open-symbol-insertion-modal",
            name: "Open symbol inserter",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (!view) {
                    return false;
                }

                new BuiltinSymbolsInsertionModal(this, editor).open();

                return true;
            }
        });
    }

    private addOpenFavoriteSymbolsInsertionModalCommand(): void {
        this.addCommand({
            id: "open-favorite-symbols-insertion-modal",
            name: "Open favorite symbol inserter",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (!view) {
                    return false;
                }
                
                new SymbolInsertionModal(
                    this,
                    editor,
                    this.settings.favoriteSymbols,
                    "Favorite Symbols"
                ).open();

                return true;
            }
        });
    }

    addOpenCustomSymbolGroupModalCommand(): void {
        this.addCommand({
            id: "open-custom-symbol-group-modal",
            name: "Open custom symbol group inserter",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (!view) {
                    return false;
                }

                new SymbolInsertionModal(
                    this,
                    editor,
                    this.settings.customSymbolGroup,
                    "Custom Symbol Group"
                ).open();

                return true;
            }
        });
    }

    private addFavoriteSymbolCommands(): void {
        for (let i = 0; i < InsertSymbolPlugin.FAVORITE_SYMBOL_INSERTION_COMMAND_COUNT; i++) {
            this.addCommand({
                id: `insert-favorite-symbol-${i + 1}`,
                name: `Insert favorite symbol ${i + 1}`,
                editorCallback: async (editor: Editor, view: MarkdownView) => {
                    if (!view) {
                        return false;
                    }

                    const symbol = this.settings.favoriteSymbols.symbols[i];
                    editor.replaceSelection(symbol);
                    this.lastSymbol = symbol;
                    
                    return true;
                }
            });
        }
    }

    private addSearchForSymbolGroupCommand(): void {
        this.addCommand({
            id: "search-for-symbol-group",
            name: "Search for symbol group",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (!view) {
                    return false;
                }

                new SymbolGroupSearchModal(this, this.app, editor).open();

                return true;
            }
        });
    }

    private addInsertMostRecentSymbolCommand(): void {
        this.addCommand({
            id: "insert-latest-symbol",
            name: "Insert latest symbol",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (!view) {
                    return false;
                }

                editor.replaceSelection(this.lastSymbol);

                return true;
            }
        });
    }
}
