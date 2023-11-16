export function regtree(source: Source, flags?: Flag | Flag[]): RegExp {
	let pattern: string;
	if (Array.isArray(source)) {
		pattern = source.map(x => emit(x)).join('');
	} else {
		pattern = emit(source);
	}
	return new RegExp(pattern);
}

export type Source = Elem | Elem[];
export type Flag = 'i' | 'g';
export type Elem = TextElem | CharElem | ManyElem | GroupElem;

/** abc */
export class TextElem {
	public body: string;
	constructor(
		body: string | string[],
	) {
		this.body = Array.isArray(body) ? body.join('') : body;
	}
}
export function text(body: string | string[]): TextElem {
	return new TextElem(body);
}

/** [abc] or [a-z] */
export class CharElem {
	constructor(
		public body: (string | { begin: string, end: string }) | (string | { begin: string, end: string })[],
	) { }
}
export function char(body: (string | { begin: string, end: string }) | (string | { begin: string, end: string })[]): CharElem {
	return new CharElem(body);
}

/** a+ */
export class ManyElem {
	constructor(
		public body: Elem,
		public min: 0 | 1,
	) { }
}
export function many(body: Elem, min: 0 | 1): ManyElem {
	return new ManyElem(body, min);
}

/** (abc) */
export class GroupElem {
	constructor(
		public body: Elem | Elem[],
	) { }
}
export function group(body: Elem | Elem[]): GroupElem {
	return new GroupElem(body);
}

function emit(e: Elem) {
	if (e instanceof TextElem) {
		return emitTextElement(e);
	} else if (e instanceof CharElem) {
		return emitCharElement(e);
	} else if (e instanceof ManyElem) {
		return emitManyElement(e);
	} else if (e instanceof GroupElem) {
		return emitGroupElement(e);
	} else {
		throw new Error('unknown element');
	}
}

function emitTextElement(e: TextElem): string {
	return e.body;
}

function emitCharElement(e: CharElem): string {
	function emitSubElem(c: string | { begin: string, end: string }): string {
		return (typeof c === 'string') ? c : `${c.begin}-${c.end}`;
	}
	if (Array.isArray(e.body)) {
		return '[' + e.body.map(x => emitSubElem(x)).join('') + ']';
	} else {
		return '[' + emitSubElem(e.body) + ']';
	}
}

function emitManyElement(e: ManyElem): string {
	return emit(e.body) + (e.min == 0 ? '*' : '+');
}

function emitGroupElement(e: GroupElem): string {
	if (Array.isArray(e.body)) {
		return '(' + e.body.map(x => emit(x)).join('') + ')';
	} else {
		return '(' + emit(e.body) + ')';
	}
}
