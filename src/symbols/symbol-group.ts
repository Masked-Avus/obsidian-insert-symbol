import { Utf16Symbol } from "./types";
import Utf16Range from "./range";

export default class SymbolGroup {
    readonly name: string;
    readonly description?: string;
    readonly symbols: Utf16Symbol[];

    constructor(name: string, symbols: Utf16Range) {
        this.name = name;
        this.symbols = symbols.toArray();
    }
}
