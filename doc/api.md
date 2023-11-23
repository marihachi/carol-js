# API

## function: carol
```ts
carol(source: string | RegExp): Pattern
```

## function: seq
```
seq(patterns: Pattern[]): Pattern
```

## class: Pattern
### Constructor
```
constructor(source: string)
```

### method: Pattern.many
```
Pattern.many(min?: number, greedy?: boolean): Pattern
Pattern.many(min: number, max: number, greedy?: boolean): Pattern
Pattern.many(opts: { min?: number, max?: number, greedy?: boolean, length?: number }): Pattern
```

### method: Pattern.option
```
Pattern.option(greedy?: boolean): Pattern
```

### method: Pattern.capture
```
Pattern.capture(): Pattern
```

### method: Pattern.toRegex
```
Pattern.toRegex(flags?: Flag | Flag[]): RegExp
```
