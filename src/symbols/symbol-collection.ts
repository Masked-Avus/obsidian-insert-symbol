import SymbolGroup from "./internal-symbol-group";

// Holds all internally-defined symbol groups.
export default class SymbolCollection {
    private readonly symbols: SymbolGroup[] = [];

    get symbolGroups(): string[] {
        const tableNames: string[] = [];

        this.symbols.forEach((symbolGroup: SymbolGroup) => {
            tableNames.push(symbolGroup.name);
        });

        return tableNames;
    }

    get count(): number {
        return this.symbolGroups.length;
    }

    getSymbols(name: string): SymbolGroup | undefined {
        for (const symbolGroup of this.symbols) {
            if (symbolGroup.name === name) {
                return symbolGroup;
            }
        }

        return undefined;
    }

    addSymbols(symbols: SymbolGroup): boolean {
        if (this.contains(symbols)) {
            return false;
        }

        this.symbols.push(symbols);

        return true;
    }

    removeSymbols(name: string): boolean {
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].name === name) {
                removeAt(this.symbols, i);
                return true;
            }
        }

        return false;
    }

    getArrayCopy(): SymbolGroup[] {
        const groups: SymbolGroup[] = [];

        this.symbols.forEach((symbolGroup: SymbolGroup) => {
            groups.push(symbolGroup);
        });

        return groups;
    }

    forEach(callback: (symbolGroup: SymbolGroup) => void): void {
        this.symbols.forEach(callback);
    }

    contains(symbols: SymbolGroup): boolean {
        for (const symbolGroup of this.symbols) {
            if (symbolGroup.name == symbols.name) {
                return true;
            }
        }

        return false;
    }
}

function removeAt(symbols: SymbolGroup[], index: number): void {
    if ((index < 0) || (index >= symbols.length)) {
        return;
    }

    symbols.splice(index, 1);
}
