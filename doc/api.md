# API

## Function: carol
```
carol(source: string | RegExp): Pattern
```

## Function: seq
```
seq(patterns: Pattern[]): Pattern
```

## Class: Pattern
### Constructor
```
constructor(source: string)
```

### Method: many
```
Pattern.many(min?: number, greedy?: boolean): Pattern
Pattern.many(min: number, max: number, greedy?: boolean): Pattern
Pattern.many(opts: { min?: number, max?: number, greedy?: boolean, length?: number }): Pattern
```

### Method: option
```
Pattern.option(greedy?: boolean): Pattern
```

### Method: capture
```
Pattern.capture(): Pattern
```

### Method: toRegex
```
Pattern.toRegex(flags?: Flag | Flag[]): RegExp
```
