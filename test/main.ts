import test, { describe } from 'node:test';
import assert from 'node:assert';
import C from '../dist/carol.js';

describe('main', () => {
  test('carol()', () => {
    assert.strictEqual(C.token(/abc/).toRegex().source, 'abc');
    assert.strictEqual(C.token('abc').toRegex().source, 'abc');
  });

  test('seq()', () => {
    assert.strictEqual(C.seq([C.token(/abc/), C.token(/xyz/)]).toRegex().source, 'abcxyz');
    assert.strictEqual(C.seq([C.token(/abc/).many(), C.token(/xyz/)]).toRegex().source, '(?:abc)*xyz');
  });

  test('alt()', () => {
    assert.strictEqual(C.alt([C.token(/abc/), C.token(/xyz/)]).toRegex().source, '(?:abc|xyz)');
  });

  test('Pattern.many()', () => {
    assert.strictEqual(C.token(/abc/).many().toRegex().source, '(?:abc)*');
    assert.strictEqual(C.token(/abc/).many(0).toRegex().source, '(?:abc)*');
    assert.strictEqual(C.token(/abc/).many(1).toRegex().source, '(?:abc)+');
    assert.strictEqual(C.token(/abc/).many(2).toRegex().source, '(?:abc){2,}');
    assert.strictEqual(C.token(/abc/).many(3, 5).toRegex().source, '(?:abc){3,5}');
    assert.strictEqual(C.token(/abc/).many({length: 2}).toRegex().source, '(?:abc){2}');
    assert.strictEqual(C.token(/abc/).many(2, 2).toRegex().source, '(?:abc){2}');
  });

  test('Pattern.many() greedy', () => {
    assert.strictEqual(C.token(/abc/).many({min: 0, greedy: true}).toRegex().source, '(?:abc)*');
    assert.strictEqual(C.token(/abc/).many({min: 1, greedy: true}).toRegex().source, '(?:abc)+');
    assert.strictEqual(C.token(/abc/).many({min: 2, greedy: true}).toRegex().source, '(?:abc){2,}');
    assert.strictEqual(C.token(/abc/).many({min: 3, max: 5, greedy: true}).toRegex().source, '(?:abc){3,5}');
    assert.strictEqual(C.token(/abc/).many({length: 2, greedy: true}).toRegex().source, '(?:abc){2}');
    assert.strictEqual(C.token(/abc/).many({min: 2, max: 2, greedy: true}).toRegex().source, '(?:abc){2}');

    assert.strictEqual(C.token(/abc/).many({min: 0, greedy: false}).toRegex().source, '(?:abc)*?');
    assert.strictEqual(C.token(/abc/).many({min: 1, greedy: false}).toRegex().source, '(?:abc)+?');
    assert.strictEqual(C.token(/abc/).many({min: 2, greedy: false}).toRegex().source, '(?:abc){2,}?');
    assert.strictEqual(C.token(/abc/).many({min: 3, max: 5, greedy: false}).toRegex().source, '(?:abc){3,5}?');
    assert.strictEqual(C.token(/abc/).many({length: 2, greedy: false}).toRegex().source, '(?:abc){2}?');
    assert.strictEqual(C.token(/abc/).many({min: 2, max: 2, greedy: false}).toRegex().source, '(?:abc){2}?');
  });

  test('Pattern.many() simple char', () => {
    assert.strictEqual(C.token(/a/).many().toRegex().source, 'a*');
    assert.strictEqual(C.token(/a/).many(1).toRegex().source, 'a+');
  });

  test('Pattern.option()', () => {
    assert.strictEqual(C.token(/abc/).option().toRegex().source, '(?:abc)?');
  });

  test('Pattern.option() greedy', () => {
    assert.strictEqual(C.token(/abc/).option({greedy: true}).toRegex().source, '(?:abc)?');
    assert.strictEqual(C.token(/abc/).option({greedy: false}).toRegex().source, '(?:abc)??');
  });

  test('Pattern.option() simple char', () => {
    assert.strictEqual(C.token(/a/).option().toRegex().source, 'a?');
  });

  test('Pattern.capture()', () => {
    assert.strictEqual(C.token(/abc/).capture().toRegex().source, '(abc)');
  });

  test('hello world', () => {
    const regex = C.seq([
      C.token(/hello/),
      C.token(/ /),
      C.token(/world/),
      C.token(/!/).many(1),
    ]).many().toRegex();

    assert.strictEqual(regex.source, '(?:hello world(?:!)+)*');
  });
});
