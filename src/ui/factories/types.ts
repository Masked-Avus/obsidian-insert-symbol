import { Utf16Symbol } from "src/symbols/types";
import Table from "../elements/table";

export default interface TableFactory {
    createTable(
        container: HTMLElement,
        contents: Utf16Symbol[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
    ): Table;
}
