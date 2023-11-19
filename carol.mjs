/**
 * RegExp flag
 * @typedef {'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y'} Flag
*/

/** A regex builder */
export class Carol {
  /**
   * Constructor
   * 
   * @overload
   * @param { Carol | Carol[] } tree
  */
  /**
   * Constructor
   * 
   * @overload
   * @param { string } pattern
  */
  /** @param { unknown } arg */
  constructor(arg) {
    if (Array.isArray(arg)) {
      /** @type {string} */
      this.pattern = arg.map(x => {
        if (!(x instanceof Carol)) {
          throw new TypeError('invalid argument');
        }
        return x.pattern;
      }).join('');
    } else if (arg instanceof Carol) {
      this.pattern = arg.pattern;
    } else if (typeof arg === 'string') {
      this.pattern = arg;
    } else {
      throw new TypeError('invalid argument');
    }
  }

  /**
   * many 0
   * 
   * @param { boolean | undefined } greedy
   * @returns { Carol } generated Carol instance
  */
  many0(greedy) {
    if (greedy != null && typeof greedy !== 'boolean') {
      throw new TypeError('invalid argument');
    }
    let quantifier = '*';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Carol('(?:' + this.pattern + ')' + quantifier);
  }

  /**
   * many 1
   * 
   * @param { boolean | undefined } greedy
   * @returns { Carol } generated Carol instance
  */
  many1(greedy) {
    if (greedy != null && typeof greedy !== 'boolean') {
      throw new TypeError('invalid argument');
    }
    let quantifier = '+';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Carol('(?:' + this.pattern + ')' + quantifier);
  }

  /**
   * many just
   * 
   * @param { number } count
   * @returns { Carol } generated Carol instance
  */
  manyJust(count) {
    if (typeof count !== 'number') {
      throw new TypeError('invalid argument');
    }
    return new Carol('(?:' + this.pattern + '){' + count + '}');
  }

  /**
   * many range
   * 
   * @overload
   * @param { number } min
   * @param { boolean | undefined } greedy
   * @returns { Carol } generated Carol instance
  */
 /**
  * many range
  * 
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
   * Capture text.
   * 
   * @returns { Carol } generated Carol instance
  */
  capture() {
    return new Carol('(' + this.pattern + ')');
  }

  /**
   * build a RegExp from the Carol instance.
   * 
   * @param { Flag | Flag[] | undefined } flags
   * @returns { RegExp } RegExp object
  */
  build(flags) {
    if (flags == null) {
      flags = '';
    }
    if (!Array.isArray(flags) && typeof flags !== 'string') {
      throw new TypeError('invalid argument');
    }
    return new RegExp(
      this.pattern,
      (Array.isArray(flags) ? flags.join('') : flags),
    );
  }
}

/**
 * Create a Carol instance from a RegExp.
 * 
 * @param { RegExp | RegExp[] } pattern
 * @returns { Carol } generated Carol instance
*/
export function regex(pattern) {
  if (!Array.isArray(pattern) && !(pattern instanceof RegExp)) {
    throw new TypeError('invalid argument');
  }
  return new Carol(
    Array.isArray(pattern)
      ? pattern.map(x => {
        if (!(x instanceof RegExp)) {
          throw new TypeError('invalid argument');
        }
        return x.source;
      }).join('')
      : pattern.source
  );
}

/**
 * Create a Carol instance from sequence.
 * 
 * @param { Carol | Carol[] } tree
 * @returns { Carol } generated Carol instance
*/
export function seq(tree) {
  return new Carol(tree);
}
