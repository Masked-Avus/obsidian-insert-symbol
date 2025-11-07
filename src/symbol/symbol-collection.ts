import InternalSymbolGroup from "./internal-symbol-group";

// Holds all internally-defined symbol groups.
export default class SymbolCollection {
    private readonly symbols: InternalSymbolGroup[] = [];

    get symbolGroups(): string[] {
        const tableNames: string[] = [];

        this.symbols.forEach((symbolGroup: InternalSymbolGroup) => {
            tableNames.push(symbolGroup.getName());
        });

        return tableNames;
    }

    getSymbols(name: string): InternalSymbolGroup | undefined {
        for (const symbolGroup of this.symbols) {
            if (symbolGroup.getName() === name) {
                return symbolGroup;
            }
        }

        return undefined;
    }

    addSymbols(symbols: InternalSymbolGroup): boolean {
        if (this.contains(symbols)) {
            return false;
        }

        this.symbols.push(symbols);

        return true;
    }

    removeSymbols(name: string): boolean {
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].getName() === name) {
                removeAt(this.symbols, i);
                return true;
            }
        }

        return false;
    }

    forEach(callback: (symbolGroup: InternalSymbolGroup) => void): void {
        this.symbols.forEach(callback);
    }

    contains(symbols: InternalSymbolGroup): boolean {
        for (const symbolGroup of this.symbols) {
            if (symbolGroup.getName() === symbols.getName()) {
                return true;
            }
        }

        return false;
    }
}

function removeAt(symbols: InternalSymbolGroup[], index: number): void {
    if ((index < 0) || (index >= symbols.length)) {
        return;
    }

    symbols.splice(index, 1);
}
