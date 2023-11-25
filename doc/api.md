# Function: carol
```
carol(source: string | RegExp): Pattern
```
Creates a new pattern from a RegExp or regex string.

# Function: seq
```
seq(patterns: Pattern[]): Pattern
```
Creates a new pattern from a pattern sequence.

# Class: Pattern
## Constructor
```
constructor(source: string)
```

## Method: many
```
Pattern.many(min?: number, max?: number): Pattern
Pattern.many(opts: { min?: number, max?: number, length?: number, greedy?: boolean }): Pattern
```
Creates a new pattern that repeats the pattern.

## Method: option
```
Pattern.option(opts?: { greedy?: boolean }): Pattern
```
Create a new pattern that is allowed to not match the pattern.

## Method: capture
```
Pattern.capture(): Pattern
```
Capture the pattern.

## Method: toRegex
```
Pattern.toRegex(flags?: Flag | Flag[]): RegExp
```
Build a RegExp from the pattern.
