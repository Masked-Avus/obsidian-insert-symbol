import {
    PluginSettingTab,
    App,
    Setting
} from "obsidian";

import {
    getDefaultSymbol,
    Utf16Symbol,
} from "./symbol/types";

import {
    CustomSymbolGroupData
} from "./symbol/custom-symbol-group";

import {
    Icon
} from "./ui/utils";

import InsertSymbolPlugin from "./main";
import Table from "./ui/element/table";
import AssignInsertionCommandsModal from "./ui/modal/assign-insertion-modal";
import EditCustomSymbolGroupModal from "./ui/modal/edit-custom-symbol-table-modal";

export interface InsertSymbolPluginSettings {
    recentSymbols: CustomSymbolGroupData;
    favoriteSymbols: CustomSymbolGroupData;
    lastSymbol: Utf16Symbol;
    //customSymbolGroup: CustomSymbolGroupData;
}

export const DEFAULT_SETTINGS: InsertSymbolPluginSettings = {
    // Both of these MUST be at 10 elements, exactly.
    recentSymbols: new CustomSymbolGroupData(
        "Recent Symbols",
        getEmptySymbolArray(),
        "Symbols most recently selected from the insertion modal."
    ),
    favoriteSymbols: new CustomSymbolGroupData(
        "Favorite Symbols",
        getEmptySymbolArray(),
        "Symbols currently assigned to the insertion commands."
    ),
    lastSymbol: getDefaultSymbol()
}

export function updateRecentSymbols(settings: InsertSymbolPluginSettings, symbol: string) {
    settings.recentSymbols.symbols.unshift(symbol);
    // So size of [recentSymbols] remains at [Table.MAX_COLUMNS] length.
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

    private addEditCustomSymbolGroupButton() {
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

function getEmptySymbolArray(): string[] {
    const array: string[] = new Array(Table.MAX_COLUMNS);

    for (let i = 0; i < Table.MAX_COLUMNS; i++) {
        array[i] = i.toString();
    }

    return array;
}
