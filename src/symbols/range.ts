import { Utf16Code, Utf16Symbol } from "./types";

export default class Utf16Range {
    constructor(
        private start: Utf16Code,
        private end: Utf16Code,
        private excludedSymbols?: Utf16Code[]
        ) {
        
        if (this.start > this.end) {
            throw new Error(
                `Start of range (${this.start}) cannot be greater than end of range (${this.end}).`
            );
        }
    }

    getFirst(): Utf16Code {
        return this.start;
    }

    getLast(): Utf16Code {
        return this.end;
    }

    get count(): number {
        return (this.end > this.start) ? ((this.end - this.start) + 1) : 0;
    }

    getSymbol(index: number): Utf16Code {
        const maxIndex = this.end - this.start;

        if ((index > maxIndex) || (index < 0)) {
            throw new Error(`Value ${index} exceeds index range (${0}-${maxIndex}).`);
        }

        return this.start + index;
    }

    toArray(): Utf16Symbol[] {
        const array: Utf16Symbol[] = [];

        for (let i = 0; i < this.count; i++) {
            const symbolCode = this.getSymbol(i);

            if (!this.matchSymbolCode(symbolCode)) {
                array.push(String.fromCharCode(symbolCode));
            }
        }

        return array;
    }

    private matchSymbolCode(symbolCode: Utf16Code): boolean {
        if (this.excludedSymbols === undefined) {
            return false;
        }

        for (let i = 0; i < this.excludedSymbols.length; i++) {
            if (this.excludedSymbols[i] === symbolCode) {
                return true;
            }
        }

        return false;
    }
}
