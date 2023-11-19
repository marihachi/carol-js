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
  /** @param { unknown } arg */
  constructor(arg) {
    if (Array.isArray(arg)) {
      /** @type {string} */
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
   * @param { boolean | undefined } greedy
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
   * @param { boolean | undefined } greedy
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
   * @param { number } count
   * @returns { Carol } generated Carol instance
  */
  manyJust(count) {
    return new Carol('(?:' + this.pattern + '){' + count + '}');
  }

  /**
   * @overload
   * @param { number } min
   * @param { boolean | undefined } greedy
   * @returns { Carol } generated Carol instance
  */
 /**
   * @overload
   * @param { number } min
   * @param { number } max
   * @param { boolean | undefined } greedy
   * @returns { Carol } generated Carol instance
  */
  /** @param { unknown[] } args */
  many(...args) {
    if (typeof args[0] === 'number' && typeof args[1] === 'number' && (args[2] == null || typeof args[2] === 'boolean')) {
      const min = args[0];
      const max = args[1];
      const greedy = args[2];
      let quantifier = '{' + min + ',' + max + '}';
      if (greedy === false) {
        quantifier += '?';
      }
      return new Carol('(?:' + this.pattern + ')' + quantifier);
    } else if (typeof args[0] === 'number' && (args[1] == null || typeof args[1] === 'boolean')) {
      const min = args[0];
      const greedy = args[1];
      let quantifier = '{' + min + ',' + '}';
      if (greedy === false) {
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
   * @param { Flag | Flag[] | undefined } flags
   * @returns { RegExp } RegExp object
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
 * @param { Carol | Carol[] } tree
 * @returns { Carol } generated Carol instance
*/
export function seq(tree) {
  return new Carol(tree);
}
