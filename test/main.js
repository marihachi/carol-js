import assert from 'node:assert';
import test from 'node:test';
import carol from '../lib/carol.js';

test('pattern()', () => {
  assert.strictEqual(carol(/abc/).toRegex().source, 'abc');
  assert.strictEqual(carol('abc').toRegex().source, 'abc');
});

test('.many0()', () => {
  assert.strictEqual(carol(/abc/).many0().toRegex().source, '(?:abc)*');
});

test('.many0() greedy', () => {
  assert.strictEqual(carol(/abc/).many0(true).toRegex().source, '(?:abc)*');
  assert.strictEqual(carol(/abc/).many0(false).toRegex().source, '(?:abc)*?');
});

test('.many1()', () => {
  assert.strictEqual(carol(/abc/).many1().toRegex().source, '(?:abc)+');
});

test('.many1() greedy', () => {
  assert.strictEqual(carol(/abc/).many1(true).toRegex().source, '(?:abc)+');
  assert.strictEqual(carol(/abc/).many1(false).toRegex().source, '(?:abc)+?');
});

test('.many()', () => {
  assert.strictEqual(carol(/abc/).many(0).toRegex().source, '(?:abc){0,}');
  assert.strictEqual(carol(/abc/).many(1).toRegex().source, '(?:abc){1,}');
  assert.strictEqual(carol(/abc/).many(2).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(carol(/abc/).many(3, 5).toRegex().source, '(?:abc){3,5}');
});

test('.many() greedy', () => {
  assert.strictEqual(carol(/abc/).many(2, true).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(carol(/abc/).many(3, 5, true).toRegex().source, '(?:abc){3,5}');
  assert.strictEqual(carol(/abc/).many(2, false).toRegex().source, '(?:abc){2,}?');
  assert.strictEqual(carol(/abc/).many(3, 5, false).toRegex().source, '(?:abc){3,5}?');
});

test('.manyJust()', () => {
  assert.strictEqual(carol(/abc/).manyJust(3).toRegex().source, '(?:abc){3}');
});

test('.capture()', () => {
  assert.strictEqual(carol(/abc/).capture().toRegex().source, '(abc)');
});

test('seq()', () => {
  assert.strictEqual(carol.seq([carol(/abc/), carol(/xyz/)]).toRegex().source, 'abcxyz');
  assert.strictEqual(carol.seq([carol(/abc/).many0(), carol(/xyz/)]).toRegex().source, '(?:abc)*xyz');
});

test('hello world', () => {
  const regex = carol.seq([
    carol(/hello/),
    carol(/ /),
    carol(/world/),
    carol(/!/).many0(),
  ]).many1().toRegex();
  
  assert.strictEqual(regex.source, '(?:hello world(?:!)*)+');
  assert.strictEqual(regex.test('hello world!hello world!!hello world!!!'), true);
});
