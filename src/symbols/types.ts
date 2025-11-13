export type Utf16Code = number;
export type Utf16Symbol = string;

/*
export function toHexNumber(value: string) {
    const hexValue = Buffer.from(value).toString("hex");
    return Number(hexValue);
}
*/

/*
export function areEqual(left: Utf16Code, right: Utf16Code) {
    return left === right;
}
*/

export function getDefaultSymbol(): Utf16Symbol {
    return "";
}
