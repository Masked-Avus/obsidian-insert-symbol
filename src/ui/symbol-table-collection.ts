import InsertSymbolPlugin from "src/main";
import SymbolGroup from "src/symbols/symbol-group";
import SymbolTableDisplay from "./table-display";
import StaticTableFactory from "./factories/static-table-factory";

export default class SymbolTableCollection {
    private plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private onClickCallback: (cell: HTMLTableCellElement, symbol: string) => Promise<void>;
    private tableFactory: StaticTableFactory = new StaticTableFactory();

    constructor(
        container: HTMLElement,
        plugin: InsertSymbolPlugin,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => Promise<void>
        ) {
        
        this.plugin = plugin;
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.build();
    }

    private build(): void {
        const symbolGroups = this.plugin.symbolGroups.getAllSymbols();

        for (let i = 0; i < symbolGroups.length; i++) {
            const group = this.plugin.symbolGroups.getSymbols(symbolGroups[i]);

            if ((group !== undefined) && (group.symbols.length > 0)) {
                this.addSymbolTable(group);
            }
        }
    }

    private addSymbolTable(symbolGroup: SymbolGroup): void {
        new SymbolTableDisplay(
            this.container,
            symbolGroup,
            this.onClickCallback,
            this.tableFactory,
            this.plugin.settings.collapseTablesByDefault
        );
    }
}
