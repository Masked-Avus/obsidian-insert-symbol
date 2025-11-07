import {
    Modal,
    Setting
} from "obsidian";

import {
    createParagraph,
    CssClass,
    Icon
} from "../utils";

import InsertSymbolPlugin from "src/main";

export default class EditCustomSymbolGroupModal extends Modal {
    private static readonly TITLE: string = "Edit Custom Symbol Table";

    private container: HTMLElement;
    private plugin: InsertSymbolPlugin;
    // TODO: Reference to table.

    constructor(plugin: InsertSymbolPlugin) {
        super(plugin.app);
        this.plugin = plugin;
        this.setTitle(EditCustomSymbolGroupModal.TITLE);
    }

    onOpen() {
        this.initializeContainer();
        this.addClearTableButton();
        // TODO: Put in instructions
        createParagraph(this.container, "Instructions on how to use editing table go here", CssClass.HELPER_TEXT);

        // TODO: Create custom table
        // TODO: Crate all internal symbol tables
    }

    onClose() {
        this.cleanUpContainer();
    }

    private initializeContainer() {
        this.container = this.contentEl;
        this.container.empty();
        this.container.addClass(CssClass.MODAL);
    }

    private cleanUpContainer() {
        this.contentEl.empty();
    }

    private addClearTableButton() {
        new Setting(this.container)
            .setName("Clear table")
            .addButton(button => button
                .setIcon(Icon.TRASH)
                .onClick(() => {
                    // TEMP
                    console.log("Clearing custom table has not been implemented yet");
                }
            )
        );
    }
}
