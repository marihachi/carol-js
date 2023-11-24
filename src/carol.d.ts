/*!-------------------------------------------------------------------------

MIT License

Copyright (c) 2023 marihachi <marihachi0620@gmail.com>

See: https://carol-js.mit-license.org/

---------------------------------------------------------------------------*/

/**
 * Creates a new pattern from a RegExp or regex string.
*/
declare function carol(source: string | RegExp): carol.Pattern;
export default carol;

declare namespace carol {
  /**
   * RegExp flag
  */
  export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';

  /**
   * Creates a new pattern from a pattern sequence.
   * @param patterns pattern sequence
  */
  export function seq(patterns: Pattern[]): Pattern;

  /**
   * Pattern Model
  */
  export class Pattern {
    source: string;

    /**
     * Constructor
    */
    constructor(source: string);

    /**
     * Creates a new pattern that repeats the pattern.
    */
    many(min?: number, max?: number): Pattern;

    /**
     * Creates a new pattern that repeats the pattern.
    */
    many(opts: { min?: number, max?: number, length?: number, greedy?: boolean }): Pattern;

    /**
     * Create a new pattern that is allowed to not match the pattern.
    */
    option(opts?: { greedy?: boolean }): Pattern;

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
}
