import { Utf16Symbol } from "src/symbols/types";
import Table from "../elements/table";
import TableFactory from "./types";
import DynamicTable from "../elements/dynamic-table";

export default class DynamicTableFactory implements TableFactory {
    createTable(container: HTMLElement, contents: Utf16Symbol[], onClickCallback: (cell: HTMLTableCellElement, symbol: string) => Promise<void>): Table {
        return new DynamicTable(container, contents, onClickCallback);
    }
}
