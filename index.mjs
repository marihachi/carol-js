/**
 * @typedef {'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y'} Flag
*/

export class Carol {
  /**
   * @overload
   * @param { Carol | Carol[] } tree
  */
 /**
   * @overload
   * @param { string } pattern
  */
  /**
   * @param { unknown } arg
  */
  constructor(arg) {
    if (Array.isArray(arg)) {
      this.pattern = arg.map(x => x.pattern).join('');
    } else if (arg instanceof Carol) {
      this.pattern = arg.pattern;
    } else if (typeof arg === 'string') {
      this.pattern = arg;
    } else {
      throw new TypeError('invalid argument');
    }
  }

  /**
   * @returns { Carol } generated Carol instance
  */
  many0(greedy) {
    let quantifier = '*';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Carol('(?:' + this.pattern + ')' + quantifier);
  }

  /**
   * @returns { Carol } generated Carol instance
  */
  many1(greedy) {
    let quantifier = '+';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Carol('(?:' + this.pattern + ')' + quantifier);
  }

  /**
   * @returns { Carol } generated Carol instance
  */
  manyJust(count) {
    return new Carol('(?:' + this.pattern + '){' + count + '}');
  }

  /**
   * @returns { Carol } generated Carol instance
  */
  many(a, b, c) {
    if (typeof a === 'number' && typeof b === 'number' && (c == null || typeof c === 'boolean')) {
      let quantifier = '{' + a + ',' + b + '}';
      if (c === false) {
        quantifier += '?';
      }
      return new Carol('(?:' + this.pattern + ')' + quantifier);
    } else if (typeof a === 'number' && (b == null || typeof b === 'boolean')) {
      let quantifier = '{' + a + ',' + '}';
      if (b === false) {
        quantifier += '?';
      }
      return new Carol('(?:' + this.pattern + ')' + quantifier);
    } else {
      throw new TypeError('invalid argument');
    }
  }

  /**
   * @returns { Carol } generated Carol instance
  */
  capture() {
    return new Carol('(' + this.pattern + ')');
  }

  /**
   * @param {Flag | Flag[] | undefined} flags
   * @returns { Carol } generated Carol instance
  */
  build(flags) {
    return new RegExp(
      this.pattern,
      (
        flags != null
        ? (Array.isArray(flags) ? flags.join('') : flags)
        : ''
      ),
    );
  }
}

/**
 * @param { RegExp | RegExp[] } pattern
 * @returns { Carol } generated Carol instance
*/
export function regex(pattern) {
  return new Carol(
    Array.isArray(pattern)
      ? pattern.map(x => x.source).join('')
      : pattern.source
  );
}

/**
 * @param {Carol | Carol[]} tree
 * @returns { Carol } generated Carol instance
*/
export function seq(tree) {
  return new Carol(tree);
}
