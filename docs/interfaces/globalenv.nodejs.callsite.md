[manual-screeps](../README.md) / [Exports](../modules.md) / [globalEnv](../modules/globalenv.md) / [NodeJS](../modules/globalenv.nodejs.md) / CallSite

# Interface: CallSite

[globalEnv](../modules/globalenv.md).[NodeJS](../modules/globalenv.nodejs.md).CallSite

## Table of contents

### Methods

- [getColumnNumber](globalenv.nodejs.callsite.md#getcolumnnumber)
- [getEvalOrigin](globalenv.nodejs.callsite.md#getevalorigin)
- [getFileName](globalenv.nodejs.callsite.md#getfilename)
- [getFunction](globalenv.nodejs.callsite.md#getfunction)
- [getFunctionName](globalenv.nodejs.callsite.md#getfunctionname)
- [getLineNumber](globalenv.nodejs.callsite.md#getlinenumber)
- [getMethodName](globalenv.nodejs.callsite.md#getmethodname)
- [getThis](globalenv.nodejs.callsite.md#getthis)
- [getTypeName](globalenv.nodejs.callsite.md#gettypename)
- [isConstructor](globalenv.nodejs.callsite.md#isconstructor)
- [isEval](globalenv.nodejs.callsite.md#iseval)
- [isNative](globalenv.nodejs.callsite.md#isnative)
- [isToplevel](globalenv.nodejs.callsite.md#istoplevel)

## Methods

### getColumnNumber

▸ **getColumnNumber**(): ``null`` \| *number*

Current column number [if this function was defined in a script]

**Returns:** ``null`` \| *number*

Defined in: node_modules/@types/node/globals.d.ts:531

___

### getEvalOrigin

▸ **getEvalOrigin**(): *undefined* \| *string*

A call site object representing the location where eval was called
[if this function was created using a call to eval]

**Returns:** *undefined* \| *string*

Defined in: node_modules/@types/node/globals.d.ts:537

___

### getFileName

▸ **getFileName**(): ``null`` \| *string*

Name of the script [if this function was defined in a script]

**Returns:** ``null`` \| *string*

Defined in: node_modules/@types/node/globals.d.ts:521

___

### getFunction

▸ **getFunction**(): *undefined* \| Function

Current function

**Returns:** *undefined* \| Function

Defined in: node_modules/@types/node/globals.d.ts:503

___

### getFunctionName

▸ **getFunctionName**(): ``null`` \| *string*

Name of the current function, typically its name property.
If a name property is not available an attempt will be made to try
to infer a name from the function's context.

**Returns:** ``null`` \| *string*

Defined in: node_modules/@types/node/globals.d.ts:510

___

### getLineNumber

▸ **getLineNumber**(): ``null`` \| *number*

Current line number [if this function was defined in a script]

**Returns:** ``null`` \| *number*

Defined in: node_modules/@types/node/globals.d.ts:526

___

### getMethodName

▸ **getMethodName**(): ``null`` \| *string*

Name of the property [of "this" or one of its prototypes] that holds
the current function

**Returns:** ``null`` \| *string*

Defined in: node_modules/@types/node/globals.d.ts:516

___

### getThis

▸ **getThis**(): *any*

Value of "this"

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:490

___

### getTypeName

▸ **getTypeName**(): ``null`` \| *string*

Type of "this" as a string.
This is the name of the function stored in the constructor field of
"this", if available.  Otherwise the object's [[Class]] internal
property.

**Returns:** ``null`` \| *string*

Defined in: node_modules/@types/node/globals.d.ts:498

___

### isConstructor

▸ **isConstructor**(): *boolean*

Is this a constructor call?

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:557

___

### isEval

▸ **isEval**(): *boolean*

Does this call take place in code defined by a call to eval?

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:547

___

### isNative

▸ **isNative**(): *boolean*

Is this call in native V8 code?

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:552

___

### isToplevel

▸ **isToplevel**(): *boolean*

Is this a toplevel invocation, that is, is "this" the global object?

**Returns:** *boolean*

Defined in: node_modules/@types/node/globals.d.ts:542
