import InsertSymbolPlugin from "src/main";
import InternalSymbolGroup from "src/symbol/internal-symbol-group";
import SymbolTableDisplay from "./table-display";
import StaticTableFactory from "./factory/static-table-factory";

export default class SymbolTableCollection {
    private plugin: InsertSymbolPlugin;
    private container: HTMLElement;
    private onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void;
    private tableFactory: StaticTableFactory = new StaticTableFactory();

    constructor(
        container: HTMLElement,
        plugin: InsertSymbolPlugin,
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {
        
        this.plugin = plugin;
        this.container = container;
        this.onClickCallback = onClickCallback;
        this.build();
    }

    private build(): void {
        const symbolGroups = this.plugin.symbolGroups.symbolGroups;

        for (let i = 0; i < symbolGroups.length; i++) {
            const group = this.plugin.symbolGroups.getSymbols(symbolGroups[i]);

            if ((group !== undefined) && (group.getCount() > 0)) {
                this.addSymbolTable(group);
            }
        }
    }

    private addSymbolTable(symbolGroup: InternalSymbolGroup): void {
        new SymbolTableDisplay(
            this.container,
            symbolGroup.getSymbols(),
            symbolGroup.getName(),
            this.onClickCallback,
            this.tableFactory,
            symbolGroup.getDescription()
        );
    }
}
