export function regtree(source: Source, flags?: Flag | Flag[]): RegExp {
  let pattern: string;
  pattern = emit(source);
  return new RegExp(pattern, (Array.isArray(flags) ? flags.join('') : flags));
}

export type Source = Element | Element[];
export type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';
export type Element = TextElement | CharElement | ManyElement | GroupElement;

/** abc */
export class TextElement {
  public body: string;
  constructor(
    body: string | string[],
  ) {
    this.body = Array.isArray(body) ? body.join('') : body;
  }
}
export function text(body: string | string[]): TextElement {
  return new TextElement(body);
}

/** [abc] or [a-z] */
export class CharElement {
  constructor(
    public body: (string | { begin: string, end: string }) | (string | { begin: string, end: string })[],
  ) { }
}
export function char(body: (string | { begin: string, end: string }) | (string | { begin: string, end: string })[]): CharElement {
  return new CharElement(body);
}

/** a+ */
export class ManyElement {
  constructor(
    public body: Element,
    public min: 0 | 1,
  ) { }
}
export function many(body: Element, min: 0 | 1): ManyElement {
  return new ManyElement(body, min);
}

/** (abc) */
export class GroupElement {
  constructor(
    public body: Element | Element[],
  ) { }
}
export function group(body: Element | Element[]): GroupElement {
  return new GroupElement(body);
}

//#region emit

function emit(e: Element | Element[]): string {
  if (Array.isArray(e)) {
    return e.map(x => emit(x)).join('');
  } else if (e instanceof TextElement) {
    return e.body;
  } else if (e instanceof CharElement) {
    return emitCharElement(e);
  } else if (e instanceof ManyElement) {
    return emitManyElement(e);
  } else if (e instanceof GroupElement) {
    return emitGroupElement(e);
  } else {
    throw new Error('unknown element');
  }
}

function emitCharElement(e: CharElement): string {
  function emitSub(c: string | { begin: string, end: string }): string {
    return (typeof c === 'string') ? c : `${c.begin}-${c.end}`;
  }
  if (Array.isArray(e.body)) {
    return '[' + e.body.map(x => emitSub(x)).join('') + ']';
  } else {
    return '[' + emitSub(e.body) + ']';
  }
}

function emitManyElement(e: ManyElement): string {
  return emit(e.body) + (e.min == 0 ? '*' : '+');
}

function emitGroupElement(e: GroupElement): string {
  return '(' + emit(e.body) + ')';
}

//#endregion emit
