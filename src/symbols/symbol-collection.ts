import SymbolGroup from "./symbol-group";
import { Utf16Symbol } from "./types";

export default class SymbolCollection {
    private readonly symbols: SymbolGroup[] = [];
    private internalSymbolCount: number = 0;

    get symbolCount(): number {
        return this.internalSymbolCount;
    }

    get symbolGroupCount(): number {
        return this.symbols.length;
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
        this.internalSymbolCount += symbols.symbols.length;

        return true;
    }

    removeSymbols(name: string): boolean {
        for (let i = 0; i < this.symbols.length; i++) {
            const current = this.symbols[i];

            if (current.name === name) {
                this.symbols.splice(i, 1);
                this.internalSymbolCount -= current.symbols.length;
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

    getAllSymbols(): Utf16Symbol[] {
        const symbols: string[] = [];

        this.symbols.forEach((symbolGroup: SymbolGroup) => {
            symbols.push(symbolGroup.name);
        });

        return symbols;
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
