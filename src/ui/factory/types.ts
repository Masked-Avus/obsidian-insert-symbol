import { Utf16Symbol } from "src/symbol/types";
import Table from "../element/table";

export default interface TableFactory {
    createTable(
        container: HTMLElement,
        contents: Utf16Symbol[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
    ): Table;
}
