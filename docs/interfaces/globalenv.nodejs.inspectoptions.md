[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / InspectOptions

# Interface: InspectOptions

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).InspectOptions

## Table of contents

### Properties

- [breakLength](globalenv.nodejs.inspectoptions.md#breaklength)
- [colors](globalenv.nodejs.inspectoptions.md#colors)
- [compact](globalenv.nodejs.inspectoptions.md#compact)
- [customInspect](globalenv.nodejs.inspectoptions.md#custominspect)
- [depth](globalenv.nodejs.inspectoptions.md#depth)
- [getters](globalenv.nodejs.inspectoptions.md#getters)
- [maxArrayLength](globalenv.nodejs.inspectoptions.md#maxarraylength)
- [maxStringLength](globalenv.nodejs.inspectoptions.md#maxstringlength)
- [showHidden](globalenv.nodejs.inspectoptions.md#showhidden)
- [showProxy](globalenv.nodejs.inspectoptions.md#showproxy)
- [sorted](globalenv.nodejs.inspectoptions.md#sorted)

## Properties

### breakLength

• `Optional` **breakLength**: *number*

Defined in: node_modules/@types/node/globals.d.ts:379

___

### colors

• `Optional` **colors**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:368

___

### compact

• `Optional` **compact**: *number* \| *boolean*

Setting this to `false` causes each object key
to be displayed on a new line. It will also add new lines to text that is
longer than `breakLength`. If set to a number, the most `n` inner elements
are united on a single line as long as all properties fit into
`breakLength`. Short array elements are also grouped together. Note that no
text will be reduced below 16 characters, no matter the `breakLength` size.
For more information, see the example below.

**`default`** `true`

Defined in: node_modules/@types/node/globals.d.ts:390

___

### customInspect

• `Optional` **customInspect**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:369

___

### depth

• `Optional` **depth**: ``null`` \| *number*

**`default`** 2

Defined in: node_modules/@types/node/globals.d.ts:367

___

### getters

• `Optional` **getters**: *boolean* \| ``"get"`` \| ``"set"``

If set to `true`, getters are going to be
inspected as well. If set to `'get'` only getters without setter are going
to be inspected. If set to `'set'` only getters having a corresponding
setter are going to be inspected. This might cause side effects depending on
the getter function.

**`default`** `false`

Defined in: node_modules/@types/node/globals.d.ts:362

___

### maxArrayLength

• `Optional` **maxArrayLength**: ``null`` \| *number*

Defined in: node_modules/@types/node/globals.d.ts:371

___

### maxStringLength

• `Optional` **maxStringLength**: ``null`` \| *number*

Specifies the maximum number of characters to
include when formatting. Set to `null` or `Infinity` to show all elements.
Set to `0` or negative to show no characters.

**`default`** 10000

Defined in: node_modules/@types/node/globals.d.ts:378

___

### showHidden

• `Optional` **showHidden**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:363

___

### showProxy

• `Optional` **showProxy**: *boolean*

Defined in: node_modules/@types/node/globals.d.ts:370

___

### sorted

• `Optional` **sorted**: *boolean* \| (`a`: *string*, `b`: *string*) => *number*

Defined in: node_modules/@types/node/globals.d.ts:391
