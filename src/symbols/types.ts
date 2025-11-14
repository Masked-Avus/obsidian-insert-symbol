export type Utf16Code = number;
export type Utf16Symbol = string;

export const BLANK_SYMBOL = " ";

export function isValidLength(symbol: Utf16Symbol): boolean {
    return symbol.length === 1;
}
