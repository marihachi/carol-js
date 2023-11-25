import assert from 'node:assert';
import test from 'node:test';
import carol from '../dist/carol.js';

test('carol()', () => {
  assert.strictEqual(carol(/abc/).toRegex().source, 'abc');
  assert.strictEqual(carol('abc').toRegex().source, 'abc');
});

test('carol.seq()', () => {
  assert.strictEqual(carol.seq([carol(/abc/), carol(/xyz/)]).toRegex().source, 'abcxyz');
  assert.strictEqual(carol.seq([carol(/abc/).many(), carol(/xyz/)]).toRegex().source, '(?:abc)*xyz');
});

test('alt()', () => {
  assert.strictEqual(carol.alt([carol(/abc/), carol(/xyz/)]).toRegex().source, '(?:abc|xyz)');
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
  assert.strictEqual(carol(/abc/).many({min: 0, greedy: true}).toRegex().source, '(?:abc)*');
  assert.strictEqual(carol(/abc/).many({min: 1, greedy: true}).toRegex().source, '(?:abc)+');
  assert.strictEqual(carol(/abc/).many({min: 2, greedy: true}).toRegex().source, '(?:abc){2,}');
  assert.strictEqual(carol(/abc/).many({min: 3, max: 5, greedy: true}).toRegex().source, '(?:abc){3,5}');
  assert.strictEqual(carol(/abc/).many({length: 2, greedy: true}).toRegex().source, '(?:abc){2}');
  assert.strictEqual(carol(/abc/).many({min: 2, max: 2, greedy: true}).toRegex().source, '(?:abc){2}');

  assert.strictEqual(carol(/abc/).many({min: 0, greedy: false}).toRegex().source, '(?:abc)*?');
  assert.strictEqual(carol(/abc/).many({min: 1, greedy: false}).toRegex().source, '(?:abc)+?');
  assert.strictEqual(carol(/abc/).many({min: 2, greedy: false}).toRegex().source, '(?:abc){2,}?');
  assert.strictEqual(carol(/abc/).many({min: 3, max: 5, greedy: false}).toRegex().source, '(?:abc){3,5}?');
  assert.strictEqual(carol(/abc/).many({length: 2, greedy: false}).toRegex().source, '(?:abc){2}?');
  assert.strictEqual(carol(/abc/).many({min: 2, max: 2, greedy: false}).toRegex().source, '(?:abc){2}?');
});

test('.many() simple char', () => {
  assert.strictEqual(carol(/a/).many().toRegex().source, 'a*');
  assert.strictEqual(carol(/a/).many(1).toRegex().source, 'a+');
});

test('.option()', () => {
  assert.strictEqual(carol(/abc/).option().toRegex().source, '(?:abc)?');
});

test('.option() greedy', () => {
  assert.strictEqual(carol(/abc/).option({greedy: true}).toRegex().source, '(?:abc)?');
  assert.strictEqual(carol(/abc/).option({greedy: false}).toRegex().source, '(?:abc)??');
});

test('.option() simple char', () => {
  assert.strictEqual(carol(/a/).option().toRegex().source, 'a?');
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
