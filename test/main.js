import assert from 'node:assert';
import test from 'node:test';
import carol from '../lib/carol.js';

test('carol()', () => {
  assert.strictEqual(carol(/abc/).toRegex().source, 'abc');
  assert.strictEqual(carol('abc').toRegex().source, 'abc');
});

test('carol.seq()', () => {
  assert.strictEqual(carol.seq([carol(/abc/), carol(/xyz/)]).toRegex().source, 'abcxyz');
  assert.strictEqual(carol.seq([carol(/abc/).many(), carol(/xyz/)]).toRegex().source, '(?:abc)*xyz');
});

test('.many()', () => {
  assert.strictEqual(carol(/abc/).many().toRegex().source, '(?:abc)*');
  assert.strictEqual(carol(/abc/).many(0).toRegex().source, '(?:abc)*');
  assert.strictEqual(carol(/abc/).many(1).toRegex().source, '(?:abc)+');
  assert.strictEqual(carol(/abc/).many(2).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(carol(/abc/).many(3, 5).toRegex().source, '(?:abc){3,5}');
  assert.strictEqual(carol(/abc/).many({length: 2}).toRegex().source, '(?:abc){2}');
  assert.strictEqual(carol(/abc/).many(2, 2).toRegex().source, '(?:abc){2}');
});

test('.many() greedy', () => {
  assert.strictEqual(carol(/abc/).many(0, true).toRegex().source, '(?:abc)*');
  assert.strictEqual(carol(/abc/).many(1, true).toRegex().source, '(?:abc)+');
  assert.strictEqual(carol(/abc/).many(2, true).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(carol(/abc/).many(3, 5, true).toRegex().source, '(?:abc){3,5}');
  assert.strictEqual(carol(/abc/).many({length: 2, greedy: true}).toRegex().source, '(?:abc){2}');
  assert.strictEqual(carol(/abc/).many(2, 2, true).toRegex().source, '(?:abc){2}');

  assert.strictEqual(carol(/abc/).many(0, false).toRegex().source, '(?:abc)*?');
  assert.strictEqual(carol(/abc/).many(1, false).toRegex().source, '(?:abc)+?');
  assert.strictEqual(carol(/abc/).many(2, false).toRegex().source, '(?:abc){2,}?');
  assert.strictEqual(carol(/abc/).many(3, 5, false).toRegex().source, '(?:abc){3,5}?');
  assert.strictEqual(carol(/abc/).many({length: 2, greedy: false}).toRegex().source, '(?:abc){2}?');
  assert.strictEqual(carol(/abc/).many(2, 2, false).toRegex().source, '(?:abc){2}?');
});

test('.option()', () => {
  assert.strictEqual(carol(/abc/).option().toRegex().source, '(?:abc)?');
});

test('.capture()', () => {
  assert.strictEqual(carol(/abc/).capture().toRegex().source, '(abc)');
});

test('hello world', () => {
  const regex = carol.seq([
    carol(/hello/),
    carol(/ /),
    carol(/world/),
    carol(/!/).many(1),
  ]).many().toRegex();

  assert.strictEqual(regex.source, '(?:hello world(?:!)+)*');
});
