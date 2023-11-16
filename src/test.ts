import assert from 'assert';
import {
	regtree,
	text,
	char,
	many,
	group,
} from './index.js';

// text element
assert.strictEqual(regtree(text('abc')).source, 'abc');
assert.strictEqual(regtree([text('abc'), text('xyz')]).source, 'abcxyz');

// char element
assert.strictEqual(regtree(char('abc')).source, '[abc]');
assert.strictEqual(regtree(char({ begin: 'a', end: 'z' })).source, '[a-z]');
assert.strictEqual(regtree(char(['abc', { begin: '0', end: '9' }])).source, '[abc0-9]');

// many element
assert.strictEqual(regtree(many(text('a'), 0)).source, 'a*');
assert.strictEqual(regtree(many(text('a'), 1)).source, 'a+');

// group element
assert.strictEqual(regtree(group(text('ab'))).source, '(ab)');
assert.strictEqual(regtree(group([text('a'), text('b')])).source, '(ab)');

// example
const regex = regtree([
	text('hell'),
	many(char('o'), 1),
	text(' wo'),
	many(char('r'), 1),
	text('ld'),
	many(char('!'), 0),
]);
assert.strictEqual(regex.source, /hell[o]+ wo[r]+ld[!]*/.source);
assert.strictEqual(regex.test('helloo worrrrrld!!!'), true);

console.log('Done');
