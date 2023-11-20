import { strict as assert } from 'node:assert';
import test, { run } from 'node:test';
import * as C from './carol.js';

test('pattern()', () => {
  assert.strictEqual(C.pattern(/abc/).toRegex().source, 'abc');
  assert.strictEqual(C.pattern('abc').toRegex().source, 'abc');
});

test('.many0()', () => {
  assert.strictEqual(C.pattern(/abc/).many0().toRegex().source, '(?:abc)*');
});

test('.many0() greedy', () => {
  assert.strictEqual(C.pattern(/abc/).many0(true).toRegex().source, '(?:abc)*');
  assert.strictEqual(C.pattern(/abc/).many0(false).toRegex().source, '(?:abc)*?');
});

test('.many1()', () => {
  assert.strictEqual(C.pattern(/abc/).many1().toRegex().source, '(?:abc)+');
});

test('.many1() greedy', () => {
  assert.strictEqual(C.pattern(/abc/).many1(true).toRegex().source, '(?:abc)+');
  assert.strictEqual(C.pattern(/abc/).many1(false).toRegex().source, '(?:abc)+?');
});

test('.many()', () => {
  assert.strictEqual(C.pattern(/abc/).many(0).toRegex().source, '(?:abc){0,}');
  assert.strictEqual(C.pattern(/abc/).many(1).toRegex().source, '(?:abc){1,}');
  assert.strictEqual(C.pattern(/abc/).many(2).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(C.pattern(/abc/).many(3, 5).toRegex().source, '(?:abc){3,5}');
});

test('.many() greedy', () => {
  assert.strictEqual(C.pattern(/abc/).many(2, true).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(C.pattern(/abc/).many(3, 5, true).toRegex().source, '(?:abc){3,5}');
  assert.strictEqual(C.pattern(/abc/).many(2, false).toRegex().source, '(?:abc){2,}?');
  assert.strictEqual(C.pattern(/abc/).many(3, 5, false).toRegex().source, '(?:abc){3,5}?');
});

test('.manyJust()', () => {
  assert.strictEqual(C.pattern(/abc/).manyJust(3).toRegex().source, '(?:abc){3}');
});

test('.capture()', () => {
  assert.strictEqual(C.pattern(/abc/).capture().toRegex().source, '(abc)');
});

test('seq()', () => {
  assert.strictEqual(C.seq([C.pattern(/abc/), C.pattern(/xyz/)]).toRegex().source, 'abcxyz');
  assert.strictEqual(C.seq([C.pattern(/abc/).many0(), C.pattern(/xyz/)]).toRegex().source, '(?:abc)*xyz');
});

test('hello world', () => {
  const r = C.seq([
    C.pattern(/hello/),
    C.pattern(/ /),
    C.pattern(/world/),
    C.pattern(/!/).many0(),
  ]).many1().toRegex();
  assert.strictEqual(r.source, /(?:hello world(?:!)*)+/.source);
  assert.strictEqual(r.test('hello world!hello world!!hello world!!!'), true);
});

const tests = run();

tests.on('test:fail', (data) => {
  console.log('[FAIL]', data);
});
tests.on('test:pass', (data) => {
  console.log('[PASS]', data);
});
