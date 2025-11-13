import { Utf16Symbol } from "src/symbols/types";
import Table from "../elements/table";
import TableFactory from "./types";
import StaticTable from "../elements/static-table";

export default class StaticTableFactory implements TableFactory {
    createTable(container: HTMLElement, contents: Utf16Symbol[], onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void): Table {
        return new StaticTable(container, contents, onClickCallback);
    }
}
