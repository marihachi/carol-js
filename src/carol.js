/*!-------------------------------------------------------------------------

MIT License

Copyright (c) 2023 marihachi <marihachi0620@gmail.com>

See: https://github.com/marihachi/carol-js/blob/4f314365ba991c1fad963a249fc82e8051a261cb/LICENSE

---------------------------------------------------------------------------*/

const spre = /^[\!-\/:-@\[-\`\{-\~]$/;

/** @param { unknown } source */
function carol(source) {
  let patternSource;
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
 * @param { unknown } patterns
*/
function seq(patterns) {
  if (!Array.isArray(patterns)) {
    throw new TypeError('argument "patterns" is invalid');
  }

  const source = patterns.map(x => {
    if (!(x instanceof Pattern)) {
      throw new TypeError('argument "patterns" is invalid');
    }
    return x.source;
  }).join('');

  return new Pattern(source);
}

/**
 * @param { unknown } patterns
*/
function alt(patterns) {
  if (!Array.isArray(patterns)) {
    throw new TypeError('argument "patterns" is invalid');
  }

  const source = patterns.map(x => {
    if (!(x instanceof Pattern)) {
      throw new TypeError('argument "patterns" is invalid');
    }
    return x.source;
  }).join('|');

  return new Pattern('(?:' + source + ')');
}

class Pattern {
  /** @param { unknown } source */
  constructor(source) {
    if (typeof source !== 'string') {
      throw new TypeError('argument "source" is invalid');
    }
    this.source = source;
  }

  /**
   * @param { unknown[] } args
  */
  many(...args) {
    let min, max, length, greedy;

    if (args.length > 0) {
      if (args[0] != null && typeof args[0] === 'object') {
        /** @type { Record<string, unknown> } */
        const opts = args[0];
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

    let quantifier;
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
   * @param { unknown } opts
  */
  option(opts) {
    if (opts != null && typeof opts !== 'object') {
      throw new TypeError('argument "opts" is invalid');
    }
    if (opts?.greedy != null && typeof opts?.greedy !== 'boolean') {
      throw new TypeError('argument "greedy" is invalid');
    }

    let quantifier = '?';
    if (opts?.greedy === false) {
      quantifier += '?';
    }

    if (this.source.length == 1 && !spre.test(this.source)) {
      return new Pattern(this.source + quantifier);
    } else {
      return new Pattern('(?:' + this.source + ')' + quantifier);
    }
  }

  capture() {
    return new Pattern('(' + this.source + ')');
  }

  /**
   * @param { unknown } flags
  */
  toRegex(flags) {
    if (flags == null || typeof flags === 'string') {
      return new RegExp(this.source, flags);
    }

    if (Array.isArray(flags)) {
      return new RegExp(this.source, flags.join(''));
    }

    throw new TypeError('argument "flags" is invalid');
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
