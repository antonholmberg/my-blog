---
path: '/posts/understanding-typescripts-exclude'
date: 2019-07-4:17:25.962Z
title: 'Understanding TypeScripts Exclude'
description: 'Tackling one the more advanced type featues in typescript, Exclude.'
---

I recently started to do more TypeScript. I have plenty of previous experiences
with typed languages but there were still some things in TypeScript that I didn't
really feel comfortable with at first.

### That Weird Exclude Type

While reading release notes for TypeScript 2.8 I stumbled across _Omit_. Not
knowing what it was I set out to understand it. However, the problem grew since
I found that _Omit_ was defined as a combination of _Pick_ and _Exclude_. I just
couldn't for the life of me figure out what _Exclude_ did.

Most of the articles I found about _Exclude_ would show an example of how it was
used in conjunction with another type. It felt like they sort of assumed that
the reader already knew what _Exclude_ did.

### Lets Start With Union Types

So TypeScript has this awesome feature called _union types_. I think it is
easier to show an example of a _union type_ rather than explaining it in text.

```TypeScript
type Language = "swedish" | "danish" | "english" | "french":

const firstLanguage: Language = "swedish";
const secondLanguage: Language = "english";

// Will not compile
const thirdLanguage = "meowing"
```

So in the example above we create a type called _Language_. A variable of type
_Language_ can now only be one of the languages we defined in the type. In this
case _meowing_ is not an acceptable language and therefore the program above
will not compile.

### So What Is This Exclude Thing?

This is when _Exclude_ comes in. _Exclude_ takes two _union types_ and, sort of,
subtracts the values in the second _union type_ from the first _union type_.

```TypeScript
type Language = "swedish" | "danish" | "english" | "french":
type NordicLanguage = Exclude<Language, "english" | "french">;

const firstLanguage: NordicLanguage = "swedish";
// This will not compile
const secondLanguage: NordicLanguage = "english";
```

So in the above example we create another type called _NordicLanguage_. This
type can take on all the same values as _Language_ except for the excluded values
_english_ and _french_. This is more or less the same as writing.

```TypeScript
type Language = "swedish" | "danish" | "english" | "french":
type NordicLanguage = "swedish" | "danish";
```

### A Cool Use Case

So I recently had a problem where I had an object that contained multiple keys of
the same type. I also wanted to store which keys was currently
active/selected.

As it turned out; this perfect case for _Exclude_.

```TypeScript
type AvailableArea = Exclude<keyof Map, 'selectedArea'>;

type Climate = 'grass' | 'snow' | 'sand' | 'water';
interface Area {
  climate: Climate;
}

interface Map {
  selectedArea: AvailableArea;
  north: Area;
  south: Area;
  west: Area;
  east: Area;
}
```

The first thing that we need to understand if what _keyof_ means.

```TypeScript
// Same as: type keys = "selectedArea" | "north" | "south" | "west" | "east";
type keys = keyof Map;

interface Map {
  selectedArea: AvailableArea;
  north: Area;
  south: Area;
  west: Area;
  east: Area;
}
```

So now that we have that down the question is: Do we really want _selectedArea_
to be able to refer to it self? In this case the answer was no. If I create a
_union type_ with the key names hard coded, what if I start adding more areas
like _southWest_? These questions lead me to the conclusion that probably it is
best if I use _Exclude_ here.

We know that _keyof_ returns a _union type_ where the values can be any of the
keys in the object. All we need to do now is to "exclude" _selectedArea_ and we
should be left with exactly what we want!

```typescript
type AvailableArea = Exclude<keyof Map, 'selectedArea'>;
```

This gives me the possibility to include more areas in the future and still keep
type safety throughout my application.

### Closing Thoughts

Hopefully someone found this useful in some way. Next time I might cover _Pick_
but there are plenty of tutorials out there for that and once I understood
_Exclude_ I found that _Pick_ wasn't that hard to grasp.
