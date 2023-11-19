import assert from 'assert';
import * as C from './index.mjs';

/**
 * @param {string} name
 * @param {() => void} testCase
*/
function test(name, testCase) {
  try {
    testCase();
  } catch (e) {
    console.error('[FAIL]', name);
    console.error(e);
    return;
  }
  console.log('[OK]', name);
}

test('carol()', () => {
  assert.strictEqual(C.regex(/abc/).build().source, 'abc');
  assert.strictEqual(C.regex([/abc/, /xyz/]).build().source, 'abcxyz');
});

test('.many0()', () => {
  assert.strictEqual(C.regex(/abc/).many0().build().source, '(?:abc)*');
});

test('.many0() greedy', () => {
  assert.strictEqual(C.regex(/abc/).many0(true).build().source, '(?:abc)*');
  assert.strictEqual(C.regex(/abc/).many0(false).build().source, '(?:abc)*?');
});

test('.many1()', () => {
  assert.strictEqual(C.regex(/abc/).many1().build().source, '(?:abc)+');
});

test('.many1() greedy', () => {
  assert.strictEqual(C.regex(/abc/).many1(true).build().source, '(?:abc)+');
  assert.strictEqual(C.regex(/abc/).many1(false).build().source, '(?:abc)+?');
});

test('.many()', () => {
  assert.strictEqual(C.regex(/abc/).many(0).build().source, '(?:abc){0,}');
  assert.strictEqual(C.regex(/abc/).many(1).build().source, '(?:abc){1,}');
  assert.strictEqual(C.regex(/abc/).many(2).build().source, '(?:abc){2,}');
  assert.strictEqual(C.regex(/abc/).many(3, 5).build().source, '(?:abc){3,5}');
});

test('.many() greedy', () => {
  assert.strictEqual(C.regex(/abc/).many(2, true).build().source, '(?:abc){2,}');
  assert.strictEqual(C.regex(/abc/).many(3, 5, true).build().source, '(?:abc){3,5}');
  assert.strictEqual(C.regex(/abc/).many(2, false).build().source, '(?:abc){2,}?');
  assert.strictEqual(C.regex(/abc/).many(3, 5, false).build().source, '(?:abc){3,5}?');
});

test('.manyJust()', () => {
  assert.strictEqual(C.regex(/abc/).manyJust(3).build().source, '(?:abc){3}');
});

test('.capture()', () => {
  assert.strictEqual(C.regex(/abc/).capture().build().source, '(abc)');
});

test('seq()', () => {
  assert.strictEqual(C.seq([C.regex(/abc/), C.regex(/xyz/)]).build().source, 'abcxyz');
  assert.strictEqual(C.seq([C.regex(/abc/).many0(), C.regex(/xyz/)]).build().source, '(?:abc)*xyz');
});

test('hello world', () => {
  const r = C.seq([
    C.regex(/hello/),
    C.regex(/ /),
    C.regex(/world/),
    C.regex(/!/).many0(),
  ]).many1().build();
  assert.strictEqual(r.source, /(?:hello world(?:!)*)+/.source);
  assert.strictEqual(r.test('hello world!hello world!!hello world!!!'), true);
});
