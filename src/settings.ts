import {
    PluginSettingTab,
    App,
    Setting
} from "obsidian";

import {
    getDefaultSymbol,
    Utf16Symbol,
} from "./symbols/types";

import { Icon } from "./ui/utils";
import SymbolGroup from "./symbols/internal-symbol-group";
import InsertSymbolPlugin from "./main";
import AssignInsertionCommandsModal from "./ui/modals/assign-insertion-modal";
import EditCustomSymbolGroupModal from "./ui/modals/edit-custom-symbol-group-modal";
import Utf16Range from "./symbols/range";

export interface InsertSymbolPluginSettings {
    recentSymbols: SymbolGroup;
    favoriteSymbols: SymbolGroup;
    customSymbolGroup: SymbolGroup;
    lastSymbol: Utf16Symbol;
}

export const DEFAULT_SETTINGS: InsertSymbolPluginSettings = {
    recentSymbols: new SymbolGroup(
        "Recent",
        getDefaultSymbolGroup(),
        "Symbols most recently selected from the insertion modal."
    ),
    favoriteSymbols: new SymbolGroup(
        "Favorite",
        getDefaultSymbolGroup(),
        "Symbols currently assigned to the insertion commands."
    ),
    customSymbolGroup: new SymbolGroup(
        "Custom",
        getDefaultSymbolGroup(),
        "User-defined group of symbols."
    ),
    lastSymbol: getDefaultSymbol()
}

export function updateRecentSymbols(settings: InsertSymbolPluginSettings, symbol: string) {
    settings.recentSymbols.symbols.unshift(symbol);
    settings.recentSymbols.symbols.pop();
}

export class InsertSymbolPluginSettingTab extends PluginSettingTab {
    plugin: InsertSymbolPlugin;
    private container: HTMLElement;

    constructor(app: App, plugin: InsertSymbolPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        this.initializeContainer();
        this.addAssignInsertionCommandsButton();
        this.addEditCustomSymbolGroupButton();
    }

    private initializeContainer(): void {
        const {containerEl: container} = this;
        this.container = container;
        this.container.empty();
    }

    private addAssignInsertionCommandsButton(): void {
        new Setting(this.container)
            .setName("Set insertion commands")
            .setDesc("Assign which symbol is inserted when invoking one of the \"Insert favorite symbol\" commands.")
            .addButton(button => button
                .setIcon(Icon.SWATCH_BOOK)
                .onClick(() => {
                    new AssignInsertionCommandsModal(this.plugin).open();
                }
            )
        );
    }

    private addEditCustomSymbolGroupButton(): void {
        new Setting(this.container)
            .setName("Edit custom symbol table")
            .setDesc("Assign existing symbols into a custom table.")
            .addButton(button => button
                // Icon is temporary
                .setIcon(Icon.TABLE)
                .onClick(() => {
                    new EditCustomSymbolGroupModal(this.plugin).open();
                }
            )
        );
    }
}

function getDefaultSymbolGroup(): Utf16Range {
    return new Utf16Range(0x30, 0x39);
}
