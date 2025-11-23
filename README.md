# Insert Symbol

## Overview

Insert Symbol is a desktop-only plugin for Obsidian (https://obsidian.md) that provides a suite of functionality for inserting Unicode characters into notes.

Insert Symbol was inspired by the "Insert Symbol" functionality found in Microsoft Word. While Unicode symbols can be used within Obsidian, there is no native way to use additional characters without copying and pasting them from another document. This was especially inconvenient for my own projects, which occasionally require characters beyond those of a standard English keyboard.

## Features
### Basic Insertion

To access all built-in symbol groups, use the `Open symbol inserter` command. This will bring up a modal where you can click on any cell within the tables, and the symbol featured on it will be inserted into the current active Markdown file.

### Favorite Symbols

By going into the plugin's settings and pressing the button under `Set insertion commands`, you can set 10 unique symbols as your favorites from the different built-in Unicode groups. 
- To assign a favorite symbol, click a cell in the `Favorite Symbols` table and then click a cell from another table, and the latter's value will be assigned to the former.
- To swap the positions of two different cells within the `Favorite Symbols Table`, simply click one and then click another.

There are two ways to use your favorite symbols:
1. Use one of the ten numbered `Insert favorite symbol` commands, with each number corresponding to a cell within the favorite symbols table.
2. Use the `Open favorite symbol inserter` command to open up a modal where you can access all ten favorite symbols. If you have an active Markdown document, simply click the cells to insert their corresponding symbol into your note.

### Custom Symbol Group

If you have a large group of symbols that you use frequently, you can create a custom symbol group by going to the plugin's settings and pressing the button under `Edit custom symbol table`. There, you will be taken to a modal where you can perform the following actions:
- Click a cell within any of the built-in symbol tables to add it to the custom table if it is not already present in the latter.
- Click a symbol within the custom symbol table and click a cell within another table to assign the latter's value to the former. Does nothing if the latter's symbol is already within the custom table.
- Click two different symbols within the custom symbol table to swap their values.
- Double-click a cell in the custom symbol table to remove it.

To access your custom symbol group, simply use the `Open custom symbol group inserter` command to bring up a modal where you can click any the table cells to insert their symbols into the current active Markdown file.

### Search for Symbol Group

If you know what specific symbol group you want to use and do not want to bother scrolling through the insertion modal to get to it, you can use the `Search for symbol group` command to find it quickly.

### Insert Last Used Symbol

If you have inserted a symbol using any of this plugin's aforementioned modals or commands, this plugin will remember it for as long as the current session is active or until another symbol is used. It can be inserted via the `Insert latest symbol` command. The last symbol used by this plugin is not saved between sessions.

## Installation

1. Download the `compiled-source.zip` folder from one of this repository's releases.
2. Extract the `main.js`, `styles.css`, and `manifest.json` files from `compiled-source.zip` into your vault at the path `VaultFolder/.obsidian/plugins/insert-symbol/`.
