export class Regtree {
  pattern: string;

  constructor(node: Regtree | Regtree[])
  constructor(pattern: string)
  constructor(arg: string | Regtree | Regtree[]) {
    if (Array.isArray(arg)) {
      this.pattern = arg.map(x => x.pattern).join('');
    } else if (arg instanceof Regtree) {
      this.pattern = arg.pattern;
    } else if (typeof arg === 'string') {
      this.pattern = arg;
    } else {
      throw new TypeError('invalid argument');
    }
  }

  many0(greedy?: boolean) {
    let quantifier = '*';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Regtree('(?:' + this.pattern + ')' + quantifier);
  }

  many1(greedy?: boolean) {
    let quantifier = '+';
    if (greedy === false) {
      quantifier += '?';
    }
    return new Regtree('(?:' + this.pattern + ')' + quantifier);
  }

  manyJust(count: number): Regtree {
    return new Regtree('(?:' + this.pattern + '){' + count + '}');
  }

  many(min: number, max: number, greedy?: boolean): Regtree
  many(min: number, greedy?: boolean): Regtree
  many(a: number, b?: number | boolean, c?: boolean): Regtree {
    if (typeof a === 'number' && typeof b === 'number' && (c == null || typeof c === 'boolean')) {
      let quantifier = '{' + a + ',' + b + '}';
      if (c === false) {
        quantifier += '?';
      }
      return new Regtree('(?:' + this.pattern + ')' + quantifier);
    } else if (typeof a === 'number' && (b == null || typeof b === 'boolean')) {
      let quantifier = '{' + a + ',' + '}';
      if (b === false) {
        quantifier += '?';
      }
      return new Regtree('(?:' + this.pattern + ')' + quantifier);
    } else {
      throw new TypeError('invalid argument');
    }
  }

  capture() {
    return new Regtree('(' + this.pattern + ')');
  }

  build(flags?: Flag | Flag[]): RegExp {
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

export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';

export function regex(pattern: RegExp | RegExp[]): Regtree {
  return new Regtree(
    Array.isArray(pattern)
      ? pattern.map(x => x.source).join('')
      : pattern.source
  );
}

export function seq(node: Regtree | Regtree[]): Regtree {
  return new Regtree(node);
}
