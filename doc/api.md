# API

## function: carol
```ts
function carol(source: string | RegExp): Pattern;
```

## function: seq
```ts
function seq(patterns: Pattern[]): Pattern;
```

## class: Pattern
```ts
class Pattern {
  constructor(source: string);
}
```

### method: Pattern.many
```ts
function many(min?: number, greedy?: boolean): Pattern;
function many(min: number, max: number, greedy?: boolean): Pattern;
function many(opts: { min?: number, max?: number, greedy?: boolean, length?: number }): Pattern;
```

### method: Pattern.option
```ts
function option(greedy?: boolean): Pattern;
```

### method: Pattern.capture
```ts
function capture(): Pattern;
```

### method: Pattern.toRegex
```ts
function toRegex(flags?: Flag | Flag[]): RegExp;
```
