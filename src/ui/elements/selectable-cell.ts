import { CssClass, swapOutClass } from "../utils";

export default class SelectableCell {
    private cellRef: HTMLTableCellElement | null = null;

    select(cell: HTMLTableCellElement): void {
        if (this.cellRef !== null) {
            this.unselect();
        }

        swapOutClass(cell, CssClass.TABLE_CELL, CssClass.SELECTED_TABLE_CELL);
        this.cellRef = cell;
    }

    unselect(): void {
        if (this.cellRef !== null) {
            swapOutClass(this.cellRef, CssClass.SELECTED_TABLE_CELL, CssClass.TABLE_CELL);
            this.cellRef = null;
        }
    }

    isSelected(): boolean {
        return this.cellRef !== null;
    }

    equals(cell: HTMLTableCellElement): boolean {
        return this.cellRef === cell;
    }

    getText(): string | undefined {
        return (this.cellRef !== null) ? this.cellRef.getText() : undefined;
    }
    
    setText(text: string): void {
        this.cellRef?.setText(text);
    }

    getRef(): HTMLTableCellElement | null {
        return this.cellRef;
    }
}
