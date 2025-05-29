/*!-------------------------------------------------------------------------

MIT License

Copyright (c) 2025 marihachi <marihachi0620@gmail.com>

See: https://github.com/marihachi/carol-js/blob/10d902da7e64e6647f5816d39e34ca881262386d/LICENSE

---------------------------------------------------------------------------*/

var spre = /^[\!-\/:-@\[-\`\{-\~]$/;

export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';

/**
 * Creates a new pattern from a RegExp or regex string.
*/
function carol(source: string | RegExp): Pattern
function carol(source: any) {
  var patternSource;
  if (typeof source === 'string') {
    patternSource = source;
  } else if (source instanceof RegExp) {
    patternSource = source.source;
  } else {
    throw new TypeError('argument "source" is invalid');
  }

  return new Pattern(patternSource);
}

/**
 * Creates a new pattern from a pattern sequence.
 * @param patterns pattern sequence
*/
function seq(patterns: Pattern[]): Pattern
function seq(patterns: any) {
  if (!Array.isArray(patterns)) {
    throw new TypeError('argument "patterns" is invalid');
  }

  var source = patterns.map(x => {
    if (!(x instanceof Pattern)) {
      throw new TypeError('argument "patterns" is invalid');
    }
    return x.source;
  }).join('');

  return new Pattern(source);
}

/**
 * Creates a new pattern that tests for a match to one of the patterns.
 * @param patterns patterns
*/
function alt(patterns: Pattern[]): Pattern
function alt(patterns: any) {
  if (!Array.isArray(patterns)) {
    throw new TypeError('argument "patterns" is invalid');
  }

  var source = patterns.map(x => {
    if (!(x instanceof Pattern)) {
      throw new TypeError('argument "patterns" is invalid');
    }
    return x.source;
  }).join('|');

  return new Pattern('(?:' + source + ')');
}

/**
 * Pattern Model
*/
class Pattern {
  source: string;

  /**
   * Constructor
  */
  constructor(source: string)
  constructor(source: any) {
    if (typeof source !== 'string') {
      throw new TypeError('argument "source" is invalid');
    }
    this.source = source;
  }

  /**
   * Creates a new pattern that repeats the pattern.
  */
  many(min?: number, max?: number): Pattern
  /**
   * Creates a new pattern that repeats the pattern.
  */
  many(opts: { min?: number, max?: number, length?: number, greedy?: boolean }): Pattern
  many(...args: any[]): Pattern {
    var min, max, length, greedy;

    if (args.length > 0) {
      if (args[0] != null && typeof args[0] === 'object') {
        /** @type { Record<string, unknown> } */
        var opts = args[0];
        length = opts.length;
        min = opts.min;
        max = opts.max;
        greedy = opts.greedy;
      } else if (typeof args[0] === 'number') {
        min = args[0];
        max = args[1];
      } else {
        throw new TypeError('1st argument expected a value of number or object type.');
      }
      if (min != null && typeof min !== 'number') {
        throw new TypeError('argument "min" is invalid.');
      }
      if (max != null && typeof max !== 'number') {
        throw new TypeError('argument "max" is invalid.');
      }
      if (length != null && typeof length !== 'number') {
        throw new TypeError('argument "length" is invalid.');
      }
      if (greedy != null && typeof greedy !== 'boolean') {
        throw new TypeError('argument "greedy" is invalid.');
      }
    }

    var quantifier;
    if (length != null) {
      quantifier = '{' + length + '}';
    } else {
      if (min != null && max != null) {
        if (min === max) {
          quantifier = '{' + min + '}';
        } else {
          quantifier = '{' + min + ',' + max + '}';
        }
      } else if (min != null && max == null) {
        if (min === 0) {
          quantifier = '*';
        } else if (min === 1) {
          quantifier = '+';
        } else {
          quantifier = '{' + min + ',}';
        }
      } else if (min == null && max == null) {
        quantifier = '*';
      } else {
        throw new TypeError('invalid arguments.');
      }
    }

    if (greedy === false) {
      quantifier += '?';
    }

    if (this.source.length == 1 && !spre.test(this.source)) {
      return new Pattern(this.source + quantifier);
    } else {
      return new Pattern('(?:' + this.source + ')' + quantifier);
    }
  }

  /**
   * Create a new pattern that is allowed to not match the pattern.
  */
  option(opts?: { greedy?: boolean }): Pattern
  option(opts?: any): Pattern {
    if (opts != null && typeof opts !== 'object') {
      throw new TypeError('argument "opts" is invalid');
    }
    if (opts?.greedy != null && typeof opts?.greedy !== 'boolean') {
      throw new TypeError('argument "greedy" is invalid');
    }

    var quantifier = '?';
    if (opts?.greedy === false) {
      quantifier += '?';
    }

    if (this.source.length == 1 && !spre.test(this.source)) {
      return new Pattern(this.source + quantifier);
    } else {
      return new Pattern('(?:' + this.source + ')' + quantifier);
    }
  }

  /**
   * Capture the pattern.
  */
  capture(): Pattern {
    return new Pattern('(' + this.source + ')');
  }

  /**
   * Build a RegExp from the pattern.
   * @param opts.flags Flags passed to RegExp class. You can specify a flag string or an array containing flag string.
   * @param opts.exact A boolean value indicating whether it is an exact match.
  */
  toRegex(opts?: { flags?: Flag | Flag[], exact?: boolean }): RegExp
  toRegex(opts?: any): RegExp {
    opts = opts ?? {};
    if (typeof opts !== 'object') {
      throw new TypeError('argument "opts" is invalid');
    }
    opts.flags = opts.flags ?? [];
    if (!Array.isArray(opts.flags) && typeof opts.flags !== 'string') {
      throw new TypeError('argument "opts.flags" is invalid');
    }
    opts.exact = opts.exact ?? false;
    var source = opts.exact ? `^${this.source}$` : this.source;
    if (typeof opts.flags === 'string') {
      return new RegExp(source, opts.flags);
    } else {
      return new RegExp(source, opts.flags.join(''));
    }
  }
}

export default carol;
carol.carol = carol;
carol.seq = seq;
carol.alt = alt;
carol.Pattern = Pattern;

export {
  carol,
  seq,
  alt,
  Pattern,
};
