import { Utf16Symbol } from "src/symbol/types";
import Table from "../element/table";
import TableFactory from "./types";
import StaticTable from "../element/static-table";

export default class StaticTableFactory implements TableFactory {
    createTable(container: HTMLElement, contents: Utf16Symbol[], onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void): Table {
        return new StaticTable(container, contents, onClickCallback);
    }
}
