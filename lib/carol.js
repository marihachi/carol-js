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

/** @typedef {'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y'} Flag */

/** @param { string | RegExp } source */
export default function carol(source) {
  let patternSource;
  if (typeof source === 'string')
    patternSource = source;
  else if (source instanceof RegExp)
    patternSource = source.source;
  else
    throw new TypeError('argument "source" is invalid');
  return new Pattern(patternSource);
}

export class Pattern {
  /** @param { string } source */
  constructor(source) {
    if (typeof source !== 'string')
      throw new TypeError('argument "source" is invalid');
    this.source = source;
  }

  /**
   * @overload
   * @param { number } min
   * @param { boolean | undefined } greedy
  */
  /**
   * @overload
   * @param { number } min
   * @param { number } max
   * @param { boolean | undefined } greedy
  */
  /**
   * @overload
   * @param { { min?: number, max?: number, greedy?: boolean, length?: number } } opts
  */
  /**
   * @param { unknown[] } args
  */
  many(...args) {
    let min, max, length, greedy;
    if (args.length === 0) {
      min = 0;
    } else if (typeof args[0] === 'object') {
      /** @type { Record<string, unknown> } */
      const opts = args[0];
      length = opts.length;
      min = opts.min;
      max = opts.max;
      greedy = opts.greedy;
    } else if (typeof args[0] === 'number') {
      min = args[0];
      if (typeof args[1] === 'number') {
        max = args[1];
        greedy = args[2];
      } else {
        max = undefined;
        greedy = args[1];
      }
    } else {
      throw new TypeError('argument of object or number type expected');
    }
    if (min != null && typeof min !== 'number')
      throw new TypeError('argument "min" is invalid');
    if (max != null && typeof max !== 'number')
      throw new TypeError('argument "max" is invalid');
    if (length != null && typeof length !== 'number')
      throw new TypeError('argument "length" is invalid');
    if (greedy != null && typeof greedy !== 'boolean')
      throw new TypeError('argument "greedy" is invalid');
    if (length == null && min === max)
      length = min;
    let quantifier;
    if (length == null && max == null && (min == null || min === 0 || min === 1))
      quantifier = (min == null || min === 0 ? '*' : '+');
    else if (length == null && min == null)
      throw new TypeError('argument "min" is invalid');
    else if (length == null)
      quantifier = '{' + min + ',' + (max ?? '') + '}';
    else
      quantifier = '{' + length + '}';
    if (greedy === false)
      quantifier += '?';
    return new Pattern('(?:' + this.source + ')' + quantifier);
  }

  capture() {
    return new Pattern('(' + this.source + ')');
  }

  /**
   * @param { Flag | Flag[] | undefined } flags
  */
  toRegex(flags) {
    if (flags == null || typeof flags === 'string')
      return new RegExp(this.source, flags);
    if (Array.isArray(flags))
      return new RegExp(this.source, flags.join(''));
    throw new TypeError('argument "flags" is invalid');
  }
}
carol.Pattern = Pattern;

/**
 * @param { Pattern[] } patterns
*/
export function seq(patterns) {
  if (!Array.isArray(patterns))
    throw new TypeError('argument "patterns" is invalid');
  const source = patterns.map(x => {
    if (!(x instanceof Pattern))
      throw new TypeError('argument "patterns" is invalid');
    return x.source;
  }).join('');
  return new Pattern(source);
}
carol.seq = seq;
