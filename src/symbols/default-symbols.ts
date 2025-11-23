/*
The "default-symbols" folder and its files exist because I cannot find out how to include additional
assets in the form of separate JSON files, and I need this plugin to be able to work regardless of
one's internet.
*/

import Utf16Range from "./range";
import SymbolGroup from "./symbol-group";

const DEFAULT_SYMBOLS: SymbolGroup[] = [
    new SymbolGroup(
        "Basic Latin",
        new Utf16Range(0x20, 0x7e)
    ),
    new SymbolGroup(
        "Latin-1 Supplement",
        new Utf16Range(0xa0, 0xff)
    ),
    new SymbolGroup(
        "Latin Extended-A",
        new Utf16Range(0x100, 0x17f)
    ),
    new SymbolGroup(
        "Latin Extended-B",
        new Utf16Range(0x180, 0x24f)
    ),
    new SymbolGroup(
        "IPA Extensions",
        new Utf16Range(0x250, 0x2af)
    ),
    new SymbolGroup(
        "Spacing Modifier Letters",
        new Utf16Range(0x2b0, 0x2ff)
    ),
    new SymbolGroup(
        "Combining Diacritical Marks",
        new Utf16Range(0x300, 0x36f)
    ),
    new SymbolGroup(
        "Greek and Coptic",
        new Utf16Range(0x370, 0x3ff)
    ),
    new SymbolGroup(
        "Cyrillic",
        new Utf16Range(0x400, 0x4ff)
    ),
    new SymbolGroup(
        "Cyrillic Supplement",
        new Utf16Range(0x500, 0x52f)
    ),
    new SymbolGroup(
        "Armenian",
        new Utf16Range(0x531, 0x58f)
    ),
    new SymbolGroup(
        "Hebrew",
        new Utf16Range(0x591, 0x5f4)
    ),
    new SymbolGroup(
        "Arabic",
        new Utf16Range(0x600, 0x6ff)
    ),
    new SymbolGroup(
        "Arabic Supplement",
        new Utf16Range(0x750, 0x77f)
    ),
    new SymbolGroup(
        "Thaana",
        new Utf16Range(0x8a0, 0x8ff)
    ),
    new SymbolGroup(
        "Georgian",
        new Utf16Range(0x10a0, 0x10ff)
    ),
    new SymbolGroup(
        "Buginese",
        new Utf16Range(0x1c90, 0x1cbf)
    ),
    new SymbolGroup(
        "Phonetic Extensions",
        new Utf16Range(0x1d00, 0x1d7f)
    ),
    new SymbolGroup(
        "Phonetic Extensions Supplement",
        new Utf16Range(0x1d80, 0x1dbf)
    ),
    new SymbolGroup(
        "Combining Diacritical Marks Supplement",
        new Utf16Range(0x1dc0, 0x1dff)
    ),
    new SymbolGroup(
        "Latin Extended Additional",
        new Utf16Range(0x1e00, 0x1eff)
    ),
    new SymbolGroup(
        "Greek Extended",
        new Utf16Range(0x1f00, 0x1ffe)
    ),
    new SymbolGroup(
        "General Punctuation",
        new Utf16Range(0x2000, 0x205f)
    ),
    new SymbolGroup(
        "Superscripts and Subscripts",
        new Utf16Range(0x2070, 0x209c)
    ),
    new SymbolGroup(
        "Currency Symbols",
        new Utf16Range(0x20a0, 0x20c0)
    ),
    // new SymbolGroup(
    //     "Combining Diacritical Marks for Symbols",
    //     new Utf16Range(0x20dd, 0x20dd)
    // ),
    new SymbolGroup(
        "Letterlike Symbols",
        new Utf16Range(0x2105, 0x214e)
    ),
    new SymbolGroup(
        "Number Forms",
        new Utf16Range(0x2153, 0x2184)
    ),
    new SymbolGroup(
        "Arrows",
        new Utf16Range(0x2190, 0x21a8)
    ),
    new SymbolGroup(
        "Mathematical Operators",
        new Utf16Range(0x2202, 0x2265)
    ),
    new SymbolGroup(
        "Miscellaneous Technical",
        new Utf16Range(0x2302, 0x2321)
    ),
    new SymbolGroup(
        "Enclosed Alphanumerics",
        new Utf16Range(0x2460, 0x24ff)
    )
];

export default DEFAULT_SYMBOLS;
