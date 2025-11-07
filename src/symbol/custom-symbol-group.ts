import {
    SymbolGroup,
    Utf16Symbol
} from "./types";

export class CustomSymbolGroup implements SymbolGroup {
    constructor(
        private readonly data: CustomSymbolGroupData,
        private file: string
        ) {

        CustomSymbolGroupData.assertIsValid(this.data);
    }

    getName(): string {
        return this.data.name;
    }

    getDescription(): string | undefined {
        return this.data.description;
    }

    getSymbols(): Utf16Symbol[] {
        return this.data.symbols;
    }

    getFile(): string {
        return this.file;
    }
}

// POD class to be stored in JSON.
export class CustomSymbolGroupData {
    constructor(
        readonly name: string = "Custom",
        readonly symbols: string[] = [],
        readonly description?: string
    ) {}

    static assertIsValid(data: CustomSymbolGroupData): boolean {
        const isDefined = (data.name !== undefined) && (data.symbols !== undefined);

        if (!isDefined) {
            throw new Error("Custom symbol group must have defined \"name\" and \"symbols\" properties (with an optional \"description\")");
        }

        for (const symbol in data.symbols) {
            if ((symbol.length > 1) || (symbol.length < 1)) {
                throw new Error("Custom symbol group's \"symbols\" property can only contain single-character strings");
            }
        }

        return true;
    }
}
