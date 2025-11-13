import { Utf16Symbol } from "src/symbols/types";
import Table from "./table";

export default class StaticTable extends Table {
    constructor(
        container: HTMLElement,
        contents: Utf16Symbol[],
        onClickCallback: (cell: HTMLTableCellElement, symbol: string) => void
        ) {

        super(container, contents, onClickCallback);
    }
}
