/*
This file exists because I cannot find out how to include additional assets in the form of separate
JSON files, and I need this plugin to be able to work regardless of one's internet.
*/

import Utf16Range from "./range";
import SymbolGroup from "./symbol-group";

const DEFAULT_SYMBOLS: SymbolGroup[] = [
    new SymbolGroup(
        "Basic Latin",
        new Utf16Range(0x0020, 0x007e)
    ),
    new SymbolGroup(
        "Latin-1 Supplement",
        new Utf16Range(0x00a1, 0x00ff, [
                0x00ad
            ]
        )
    ),
    new SymbolGroup(
        "Latin Extended-A",
        new Utf16Range(0x0100, 0x017f)
    ),
    new SymbolGroup(
        "Latin Extended-B",
        new Utf16Range(0x0180, 0x024f)
    ),
    new SymbolGroup(
        "IPA Extensions",
        new Utf16Range(0x0250, 0x02af)
    ),
    new SymbolGroup(
        "Spacing Modifier Letters",
        new Utf16Range(0x02b0, 0x02ff)
    ),
    new SymbolGroup(
        "Combining Diacritical Marks",
        new Utf16Range(0x0300, 0x036f)
    ),
    new SymbolGroup(
        "Greek and Coptic",
        new Utf16Range(0x0370, 0x03ff, [
                0x0378, 0x0379, 0x0380, 0x0381, 0x0382,
                0x0383, 0x038b, 0x038d0, 0x03a2
            ]
        )
    ),
    new SymbolGroup(
        "Cyrillic",
        new Utf16Range(0x0400, 0x04ff)
    ),
    new SymbolGroup(
        "Cyrillic Supplement",
        new Utf16Range(0x0500, 0x052f)
    ),
    new SymbolGroup(
        "Armenian",
        new Utf16Range(0x0531, 0x058f, [
                0x0557, 0x0558, 0x05eb, 0x05ec, 0x05ed,
                0x05ee
            ]
        )
    ),
    new SymbolGroup(
        "Hebrew",
        new Utf16Range(0x0591, 0x05f4, [
                0x05c8, 0x05c9, 0x05ca, 0x05cb, 0x05cc,
                0x05cd, 0x05ce, 0x05cf, 0x05eb, 0x05ec,
                0x05ed, 0x05ee
            ]
        )
    ),
    new SymbolGroup(
        "Arabic",
        new Utf16Range(0x0600, 0x06ff)
    ),
    new SymbolGroup(
        "Syriac",
        new Utf16Range(0x0700, 0x074f, [
                0x070e, 0x074b, 0x074c
            ]
        )
    ),
    new SymbolGroup(
        "Arabic Supplement",
        new Utf16Range(0x750, 0x77f)
    ),
    new SymbolGroup(
        "Thaana",
        new Utf16Range(0x0780, 0x07b1)
    ),
    new SymbolGroup(
        "Devangari",
        new Utf16Range(0x0900, 0x097f)
    ),
    new SymbolGroup(
        "Tamil",
        new Utf16Range(0x0b82, 0x0bfa, [
                0x0b84, 0x0b8b, 0x0b8c, 0x0b8d, 0x0b91,
                0x0b96, 0x0b97, 0x0b98, 0x0b9b, 0x0b9d,
                0x0ba0, 0x0ba1, 0x0ba2, 0x0ba5, 0x0ba6,
                0x0ba7, 0x0bab, 0x0bac, 0x0bad, 0x0bba,
                0x0bbb, 0x0bbc, 0x0bbd, 0x0bc3, 0x0bc4,
                0x0bc5, 0x0bc9, 0x0bce, 0x0bcf, 0x0bd1,
                0x0bd2, 0x0bd2, 0x0bd3, 0x0bd4, 0x0bd5,
                0x0bd6, 0x0bd8, 0x0bd9, 0x0bda, 0x0bdb,
                0x0bdc, 0x0bdd, 0x0bde, 0x0bdf, 0x0be0,
                0x0be1, 0x0be2, 0x0be3, 0x0be4, 0x0be5
            ]
        )
    ),
    new SymbolGroup(
        "Georgian",
        new Utf16Range(0x10a0, 0x10ff, [
                0x10c6, 0x10c8, 0x10c9, 0x10ca, 0x10cb,
                0x10cc, 0x10ce, 0x10cf
            ]
        )
    ),
    new SymbolGroup(
        "Ge'ez",
        new Utf16Range(0x1200, 0x137c, [
                0x1249, 0x124e, 0x124f, 0x1257, 0x1259,
                0x125e, 0x125f, 0x1289, 0x128e, 0x128f,
                0x12b1, 0x12b6, 0x12b7, 0x12bf, 0x12c1,
                0x12c5, 0x12c6, 0x12d7, 0x1311, 0x1316,
                0x1317, 0x123b, 0x123c
            ]
        )
    ),
    new SymbolGroup(
        "Combining Diactical Marks Extended",
        new Utf16Range(0x1ab0, 0x1ace, [
                0x1ac1, 0x1ac2, 0x1ac3, 0x1ac4, 0x1ac6
            ]
        )
    ),
    new SymbolGroup(
        "Buginese",
        new Utf16Range(0x1c90, 0x1cbf, [
                0x1cbb, 0x1cbc
            ]
        )
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
        new Utf16Range(0x1dc0, 0x1dff, [
                0x1dfa
            ]
        )
    ),
    new SymbolGroup(
        "Latin Extended Additional",
        new Utf16Range(0x1e00, 0x1eff)
    ),
    new SymbolGroup(
        "Greek Extended",
        new Utf16Range(0x1f00, 0x1ffe, [
                0x1f16, 0x1f17, 0x1f1e, 0x1f1f, 0x1f46,
                0x1f47, 0x1f4e, 0x1f4f, 0x1f58, 0x1f5a,
                0x1f5c, 0x1f5e, 0x1f7e, 0x1f7f, 0x1fb5,
                0x1fc5, 0x1fd4, 0x1fd5, 0x1fdc, 0x1ff0,
                0x1ff1, 0x1ff5
            ]
        )
    ),
    new SymbolGroup(
        "General Punctuation",
        new Utf16Range(0x2013, 0x205e, [
                0x2012, 0x2028, 0x2029, 0x202a, 0x202b,
                0x202c, 0x202d, 0x202e, 0x202f
            ]
        )
    ),
    new SymbolGroup(
        "Superscripts and Subscripts",
        new Utf16Range(0x2070, 0x209c, [
                0x2072, 0x2073, 0x208f
            ]
        )
    ),
    new SymbolGroup(
        "Currency Symbols",
        new Utf16Range(0x20a0, 0x20c1)
    ),
    new SymbolGroup(
        "Combining Diacritical Marks for Symbols",
        new Utf16Range(0x20d0, 0x20f0)
    ),
    new SymbolGroup(
        "Letterlike Symbols",
        new Utf16Range(0x2100, 0x214f)
    ),
    new SymbolGroup(
        "Number Forms",
        new Utf16Range(0x2150, 0x218b)
    ),
    new SymbolGroup(
        "Arrows",
        new Utf16Range(0x2190, 0x21ff)
    ),
    new SymbolGroup(
        "Mathematical Operators",
        new Utf16Range(0x2200, 0x22ff)
    ),
    new SymbolGroup(
        "Optical Character Recognition",
        new Utf16Range(0x2440, 0x244a)
    ),
    new SymbolGroup(
        "Miscellaneous Technical",
        new Utf16Range(0x2300, 0x23ff)
    ),
    new SymbolGroup(
        "Enclosed Alphanumerics",
        new Utf16Range(0x2460, 0x24ff)
    ),
    new SymbolGroup(
        "Box Drawing",
        new Utf16Range(0x2500, 0x257f)
    ),
    new SymbolGroup(
        "Block Elements",
        new Utf16Range(0x2580, 0x259f)
    ),
    new SymbolGroup(
        "Geometric Shapes",
        new Utf16Range(0x25a0, 0x25ff)
    ),
    new SymbolGroup(
        "Miscellaneous Symbols",
        new Utf16Range(0x2600, 0x26ff)
    ),
    new SymbolGroup(
        "Dingbats",
        new Utf16Range(0x2700, 0x27bf)
    )
];

export default DEFAULT_SYMBOLS;
