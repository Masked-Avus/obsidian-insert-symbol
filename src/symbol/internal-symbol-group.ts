import {
    SymbolGroup,
    Utf16Symbol
} from "./types";

import Utf16Range from "./range";

export default class InternalSymbolGroup implements SymbolGroup {
    private readonly name: string;
    private readonly description?: string;
    private readonly symbols: Utf16Range;
    //private isActive: boolean = true;

    constructor(name: string, symbols: Utf16Range, description: string | undefined) {
        this.name = name;
        this.symbols = symbols;
        this.description = description;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    getSymbols(): Utf16Symbol[] {
        return this.symbols.toArray();
    }

    getCount(): number {
        return this.symbols.getCount();
    }

    // [Symbol.iterator](): Iterator<Utf16Symbol> {
    //     let index = 0;
    //     const items = this.data.symbols;

    //     return {
    //         next(): IteratorResult<Utf16Symbol> {
    //             return (index < items.length)
    //                 ? { value: items[index++], done: false }
    //                 : { value: null, done: true};
    //         }
    //     }
    // }

    // enable(): void {
    //     this.isActive = true;
    // }

    // disable(): void {
    //     this.isActive = false;
    // }

    // isEnabled(): boolean {
    //     return this.isActive;
    // }
}
