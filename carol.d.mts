/**
 * RegExp flag
*/
export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';

/**
 * Pattern Model
*/
export declare class Pattern {
  source: string;

  /**
   * Constructor
  */
  constructor(source: string);

  /**
   * Creates a new pattern that repeats the pattern with `*`.
  */
  many0(greedy?: boolean): Pattern;

  /**
   * Creates a new pattern that repeats the pattern with `+`.
  */
  many1(greedy?: boolean): Pattern;

  /**
   * Creates a new pattern that repeats the pattern with `{count}`.
  */
  manyJust(count: number): Pattern;

  /**
   * Creates a new pattern that repeats the pattern with `{min,}`.
  */
  many(min: number, greedy?: boolean): Pattern;

  /**
   * Creates a new pattern that repeats the pattern with `{min,max}`.
  */
  many(min: number, max: number, greedy?: boolean): Pattern;

  /**
   * Capture the pattern.
  */
  capture(): Pattern;

  /**
   * Build a RegExp from the pattern.
   * @param flags regex flags
  */
  toRegex(flags?: Flag | Flag[]): RegExp;
}

/**
 * Creates a new pattern from a RegExp or regex string.
*/
export declare function pattern(source: string | RegExp): Pattern;

/**
 * Creates a new pattern from a pattern sequence.
 * @param patterns pattern sequence
*/
export declare function seq(patterns: Pattern[]): Pattern;
