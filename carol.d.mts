/**
 * RegExp flag
*/
export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';
/**
 * Pattern object
*/
export declare class Pattern {
  source: string;
  /**
   * Constructor
  */
  constructor(source: string);
  /**
   * Creates a new Pattern object that repeats the pattern with `*`.
  */
  many0(greedy?: boolean): Pattern;
  /**
   * Creates a new Pattern object that repeats the pattern with `+`.
  */
  many1(greedy?: boolean): Pattern;
  /**
   * Creates a new Pattern object that repeats the pattern with `{count}`.
  */
  manyJust(count: number): Pattern;
  /**
   * Creates a new Pattern object that repeats the pattern with `{min,}`.
  */
  many(min: number, greedy?: boolean): Pattern;
  /**
   * Creates a new Pattern object that repeats the pattern with `{min,max}`.
  */
  many(min: number, max: number, greedy?: boolean): Pattern;
  /**
   * Capture text with `()`.
  */
  capture(): Pattern;
  /**
   * Build a RegExp from the pattern.
  */
  build(flags?: Flag | Flag[]): RegExp;
}
/**
 * Creates a new Pattern object from a RegExp object.
*/
export declare function regex(pattern: RegExp | RegExp[]): Pattern;
/**
 * Creates a new Pattern object from a sequence of Pattern objects.
*/
export declare function seq(tree: Pattern | Pattern[]): Pattern;
