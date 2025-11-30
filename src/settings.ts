import { PluginSettingTab, App, Setting } from "obsidian";
import { BLANK_SYMBOL, isValidLength, Utf16Symbol } from "./symbols/types";
import { Icon } from "./ui/utils";
import SymbolGroup from "./symbols/symbol-group";
import InsertSymbolPlugin from "./main";
import AssignInsertionCommandsModal from "./ui/modals/assign-insertion-modal";
import EditCustomSymbolGroupModal from "./ui/modals/edit-custom-symbol-group-modal";
import Utf16Range from "./symbols/range";
import Table from "./ui/elements/table";
import DynamicTable from "./ui/elements/dynamic-table";

export interface InsertSymbolPluginSettings {
    recentSymbols: SymbolGroup;
    favoriteSymbols: SymbolGroup;
    customSymbolGroup: SymbolGroup;
    collapseTablesByDefault: boolean;
}

export const DEFAULT_SETTINGS: InsertSymbolPluginSettings = {
    recentSymbols: new SymbolGroup("Recent", getDefaultSymbolGroup()),
    favoriteSymbols: new SymbolGroup("Favorite", getDefaultSymbolGroup()),
    customSymbolGroup: new SymbolGroup("Custom", getDefaultSymbolGroup()),
    collapseTablesByDefault: false
}

export function updateRecentSymbols(settings: InsertSymbolPluginSettings, symbol: string): boolean {
    const recentSymbols = settings.recentSymbols.symbols;
    let found = false;

    for (let i = 0; i < recentSymbols.length; i++) {
        const recentSymbol = recentSymbols[i];

        if (symbol === recentSymbol) {
            found = true;
            break;
        }
    }

    if (!found) {
        settings.recentSymbols.symbols.unshift(symbol);
        settings.recentSymbols.symbols.pop();
        return true;
    }
    else {
        return false;
    }
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
        this.addCollapseSymbolGroupTablesByDefaultToggle();
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
                .setIcon(Icon.TABLE)
                .onClick(() => {
                    new EditCustomSymbolGroupModal(this.plugin).open();
                }
            )
        );
    }

    private addCollapseSymbolGroupTablesByDefaultToggle() {
        new Setting(this.container)
            .setName("Symbol tables collapsed by default")
            .setDesc("Set whether or not all collapsable symbol tables are collapsed by default.")
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.collapseTablesByDefault)
                .onChange(async (value: boolean) => {
                    this.plugin.settings.collapseTablesByDefault = value;
                    await this.plugin.saveSettings();
                }
            )
        );
    }
}

export function cleanSettings(settings: InsertSymbolPluginSettings) {
    if (settings.recentSymbols.symbols.length > Table.MAXIMUM_COLUMNS) {
        settings.recentSymbols.symbols.length = Table.MAXIMUM_COLUMNS;
    }

    replaceExtraLongElements(settings.recentSymbols.symbols);

    if (settings.favoriteSymbols.symbols.length > Table.MAXIMUM_COLUMNS) {
        settings.favoriteSymbols.symbols.length = Table.MAXIMUM_COLUMNS;
    }

    replaceExtraLongElements(settings.favoriteSymbols.symbols);

    if (settings.customSymbolGroup.symbols.length > DynamicTable.MAXIMUM_CELLS) {
        settings.customSymbolGroup.symbols.length = DynamicTable.MAXIMUM_CELLS;
    }

    replaceExtraLongElements(settings.customSymbolGroup.symbols);
}

function getDefaultSymbolGroup(): Utf16Range {
    return new Utf16Range(0x30, 0x39);
}

function replaceExtraLongElements(list: Utf16Symbol[]) {
    for (let i = 0; i < list.length; i++) {
        if (!isValidLength(list[i])) {
            list[i] = BLANK_SYMBOL;
        }
    }
}
