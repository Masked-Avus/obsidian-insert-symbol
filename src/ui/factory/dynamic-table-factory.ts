import { Utf16Symbol } from "src/symbol/types";
import Table from "../element/table";
import TableFactory from "./types";
import DynamicTable from "../element/dynamic-table";

export default class DynamicTableFactory implements TableFactory {
    createTable(container: HTMLElement, contents: Utf16Symbol[], onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void): Table {
        return new DynamicTable(container, contents, onClickCallback);
    }
}
