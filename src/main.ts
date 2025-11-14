import {
    Editor,
    MarkdownView,
    Notice,
    Plugin
} from "obsidian";

import {
	InsertSymbolPluginSettings,
	InsertSymbolPluginSettingTab,
	DEFAULT_SETTINGS,
    cleanSettings
} from "./settings";

import { Utf16Symbol } from "./symbols/types";
import SymbolCollection from "./symbols/symbol-collection";
import InsertSymbolModal from "./ui/modals/insertion-modal";
import InsertFavoriteSymbolModal from "./ui/modals/favorites-insertion-modal";
import DEFAULT_SYMBOLS from "./symbols/default-symbols";
import CustomSymbolGroupModal from "./ui/modals/custom-symbol-group-modal";

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
        this.addSettingTab(new InsertSymbolPluginSettingTab(this.app, this));
    }
    
    // TODO: Delete this if I never end up using it.
    onunload(): void {
        // ...
    }

    async loadSettings(): Promise<void> {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        cleanSettings(this.settings);
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

                new InsertSymbolModal(this, editor).open();

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

                new InsertFavoriteSymbolModal(this, editor).open();

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

                new CustomSymbolGroupModal(this, editor).open();

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
