import assert from 'assert';
import {
	regtree,
	text,
	char,
	many,
	group,
} from './lib.js';

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

console.log('Done');
