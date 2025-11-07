/*
The "default-symbols" folder and its files exist because I cannot find out how to include additional
assets in the form of separate JSON files, and I need this plugin to be able to work regardless of
one's internet.
*/

import Utf16Range from "./range";
import InternalSymbolGroup from "./internal-symbol-group";

const DEFAULT_SYMBOLS: InternalSymbolGroup[] = [
    new InternalSymbolGroup(
        "Basic Latin",
        new Utf16Range(0x20, 0x7e),
        0,
        "Basic set of characters consisting of Latin characters and most other characters found on a regular English keyboard."
    ),
    new InternalSymbolGroup(
        "Latin-1 Supplement",
        new Utf16Range(0xa0, 0xff),
        1,
        "Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new InternalSymbolGroup(
        "Latin Extended-A",
        new Utf16Range(0x100, 0x17f),
        2,
        "Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new InternalSymbolGroup(
        "Latin Extended-B",
        new Utf16Range(0x180, 0x24f),
        3,
        "Supplementary Latin characters, including both accented letters and additional special symbols."
    ),
    new InternalSymbolGroup(
        "IPA Extensions",
        new Utf16Range(0x250, 0x2af),
        4,
        "Additional characters added by the International Phonetic Alphabet (IPA)."
    ),
    new InternalSymbolGroup(
        "Spacing Modifier Letters",
        new Utf16Range(0x2b0, 0x2ff),
        5,
        "Non-combining characters used for modifying the meaning of other characters."
    ),
    new InternalSymbolGroup(
        "Combining Diacritical Marks",
        new Utf16Range(0x300, 0x36f),
        6,
        "Diacritic marks that visually combine with existing characters."
    )
];

export default DEFAULT_SYMBOLS;
