export default interface Displayable {
    display(): void;
    hide(): void;
    isHidden(): boolean;
}