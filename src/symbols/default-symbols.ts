/*
The "default-symbols" folder and its files exist because I cannot find out how to include additional
assets in the form of separate JSON files, and I need this plugin to be able to work regardless of
one's internet.
*/

import Utf16Range from "./range";
import SymbolGroup from "./internal-symbol-group";

const DEFAULT_SYMBOLS: SymbolGroup[] = [
    new SymbolGroup(
        "Basic Latin",
        new Utf16Range(0x20, 0x7e),
        undefined//"Basic set of characters consisting of Latin characters and most other characters found on a regular English keyboard."
    ),
    new SymbolGroup(
        "Latin-1 Supplement",
        new Utf16Range(0xa0, 0xff),
        undefined//"Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new SymbolGroup(
        "Latin Extended-A",
        new Utf16Range(0x100, 0x17f),
        undefined//"Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new SymbolGroup(
        "Latin Extended-B",
        new Utf16Range(0x180, 0x24f),
        undefined//"Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new SymbolGroup(
        "IPA Extensions",
        new Utf16Range(0x250, 0x2af),
        undefined//"Additional characters added by the International Phonetic Alphabet (IPA)."
    ),
    new SymbolGroup(
        "Spacing Modifier Letters",
        new Utf16Range(0x2b0, 0x2ff),
        undefined//"Non-combining characters used for modifying the meaning of other characters."
    ),
    new SymbolGroup(
        "Combining Diacritical Marks",
        new Utf16Range(0x300, 0x36f),
        undefined//"Diacritic marks that visually combine with existing characters."
    ),
    new SymbolGroup(
        "Greek and Coptic",
        new Utf16Range(0x370, 0x3ff),
        undefined//"Basic set of characters found in Greek and Coptic."
    ),
    new SymbolGroup(
        "Cyrillic",
        new Utf16Range(0x400, 0x4ff),
        undefined//"Basic set of Cyrillic characters."
    ),
    new SymbolGroup(
        "Cyrillic Supplement",
        new Utf16Range(0x500, 0x52f),
        undefined//"Supplementary Cyrillic characters."
    ),
    new SymbolGroup(
        "Armenian",
        new Utf16Range(0x531, 0x58f),
        undefined//"Basic set of Armenian characters."
    ),
    new SymbolGroup(
        "Hebrew",
        new Utf16Range(0x591, 0x5f4),
        undefined//"Basic set of Hebrew characters."
    ),
    new SymbolGroup(
        "Arabic",
        new Utf16Range(0x600, 0x6ff),
        undefined//"Basic set of Arabic characters."
    ),
    new SymbolGroup(
        "Arabic Supplement",
        new Utf16Range(0x750, 0x77f),
        undefined
    ),
    new SymbolGroup(
        "Thaana",
        new Utf16Range(0x8a0, 0x8ff),
        undefined
    ),
    new SymbolGroup(
        "Georgian",
        new Utf16Range(0x10a0, 0x10ff),
        undefined
    ),
    new SymbolGroup(
        "Buginese",
        new Utf16Range(0x1c90, 0x1cbf),
        undefined
    ),
    new SymbolGroup(
        "Phonetic Extensions",
        new Utf16Range(0x1d00, 0x1d7f),
        undefined
    ),
    new SymbolGroup(
        "Phonetic Extensions Supplement",
        new Utf16Range(0x1d80, 0x1dbf),
        undefined
    ),
    new SymbolGroup(
        "Combining Diacritical Marks Supplement",
        new Utf16Range(0x1dc0, 0x1dff),
        undefined
    ),
    new SymbolGroup(
        "Latin Extended Additional",
        new Utf16Range(0x1e00, 0x1eff),
        undefined
    ),
    new SymbolGroup(
        "Greek Extended",
        new Utf16Range(0x1f00, 0x1ffe),
        undefined
    ),
    new SymbolGroup(
        "General Punctuation",
        new Utf16Range(0x2000, 0x205f),
        undefined
    ),
    new SymbolGroup(
        "Superscripts and Subscripts",
        new Utf16Range(0x2070, 0x209c),
        undefined
    ),
    new SymbolGroup(
        "Currency Symbols",
        new Utf16Range(0x20a0, 0x20c0),
        undefined
    ),
    // new SymbolGroup(
    //     "Combining Diacritical Marks for Symbols",
    //     new Utf16Range(0x20dd, 0x20dd),
    //     undefined
    // ),
    new SymbolGroup(
        "Letterlike Symbols",
        new Utf16Range(0x2105, 0x214e),
        undefined
    ),
    new SymbolGroup(
        "Number Forms",
        new Utf16Range(0x2153, 0x2184),
        undefined
    ),
    new SymbolGroup(
        "Arrows",
        new Utf16Range(0x2190, 0x21a8),
        undefined
    ),
    new SymbolGroup(
        "Mathematical Operators",
        new Utf16Range(0x2202, 0x2265),
        undefined
    ),
    new SymbolGroup(
        "Miscellaneous Technical",
        new Utf16Range(0x2302, 0x2321),
        undefined
    ),
    new SymbolGroup(
        "Enclosed Alphanumerics",
        new Utf16Range(0x2460, 0x24ff),
        undefined
    )
];

export default DEFAULT_SYMBOLS;
