/*--------------------------------------------------------------------------

MIT License

Copyright (c) 2023 marihachi <marihachi0620@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---------------------------------------------------------------------------*/

/**
 * Creates a new pattern from a RegExp or regex string.
*/
declare function carol(source: string | RegExp): carol.Pattern;
export default carol;

declare namespace carol {
  /**
   * Creates a new pattern from a pattern sequence.
   * @param patterns pattern sequence
  */
  export declare function seq(patterns: Pattern[]): Pattern;

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
}
