import assert from 'assert';
import {
  regex,
  seq,
} from './index.js';

function test(name: string, testCase: () => void) {
  try {
    testCase();
  } catch (e) {
    console.error('[FAIL]', name);
    console.error(e);
    return;
  }
  console.log('[OK]', name);
}

test('regex()', () => {
  assert.strictEqual(regex(/abc/).build().source, 'abc');
  assert.strictEqual(regex([/abc/, /xyz/]).build().source, 'abcxyz');
});

test('.many0()', () => {
  assert.strictEqual(regex(/abc/).many0().build().source, '(?:abc)*');
});

test('.many0() greedy', () => {
  assert.strictEqual(regex(/abc/).many0(true).build().source, '(?:abc)*');
  assert.strictEqual(regex(/abc/).many0(false).build().source, '(?:abc)*?');
});

test('.many1()', () => {
  assert.strictEqual(regex(/abc/).many1().build().source, '(?:abc)+');
});

test('.many1() greedy', () => {
  assert.strictEqual(regex(/abc/).many1(true).build().source, '(?:abc)+');
  assert.strictEqual(regex(/abc/).many1(false).build().source, '(?:abc)+?');
});

test('.many()', () => {
  assert.strictEqual(regex(/abc/).many(0).build().source, '(?:abc){0,}');
  assert.strictEqual(regex(/abc/).many(1).build().source, '(?:abc){1,}');
  assert.strictEqual(regex(/abc/).many(2).build().source, '(?:abc){2,}');
  assert.strictEqual(regex(/abc/).many(3, 5).build().source, '(?:abc){3,5}');
});

test('.many() greedy', () => {
  assert.strictEqual(regex(/abc/).many(2, true).build().source, '(?:abc){2,}');
  assert.strictEqual(regex(/abc/).many(3, 5, true).build().source, '(?:abc){3,5}');
  assert.strictEqual(regex(/abc/).many(2, false).build().source, '(?:abc){2,}?');
  assert.strictEqual(regex(/abc/).many(3, 5, false).build().source, '(?:abc){3,5}?');
});

test('.manyJust()', () => {
  assert.strictEqual(regex(/abc/).manyJust(3).build().source, '(?:abc){3}');
});

test('.capture()', () => {
  assert.strictEqual(regex(/abc/).capture().build().source, '(abc)');
});

test('seq()', () => {
  assert.strictEqual(seq([regex(/abc/), regex(/xyz/)]).build().source, 'abcxyz');
  assert.strictEqual(seq([regex(/abc/).many0(), regex(/xyz/)]).build().source, '(?:abc)*xyz');
});

test('hello world', () => {
  const r = seq([
    regex(/hello/),
    regex(/ /),
    regex(/world/),
    regex(/!/).many0(),
  ]).many1().build();
  assert.strictEqual(r.source, /(?:hello world(?:!)*)+/.source);
  assert.strictEqual(r.test('hello world!hello world!!hello world!!!'), true);
});
