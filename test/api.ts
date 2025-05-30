import test, { describe } from 'node:test';
import assert from 'node:assert';
import _default, { token, Pattern, alt, seq } from '../dist/carol.js';

describe('api', () => {
  test('carol', () => {
    assert.strictEqual(token(/abc/).source, 'abc');
  });

  test('Pattern', () => {
    assert.strictEqual(new Pattern('abc').source, 'abc');
  });

  test('seq', () => {
    assert.strictEqual(seq([token(/abc/), token(/xyz/)]).source, 'abcxyz');
  });

  test('alt', () => {
    assert.strictEqual(alt([token(/abc/), token(/xyz/)]).source, '(?:abc|xyz)');
  });

  test('Pattern.many', () => {
    const p = token(/abc/);
    assert.strictEqual(p.many().source, '(?:abc)*');
  });

  test('Pattern.option', () => {
    const p = token(/abc/);
    assert.strictEqual(p.option().source, '(?:abc)?');
  });

  test('Pattern.capture', () => {
    const p = token(/abc/);
    assert.strictEqual(p.capture().source, '(abc)');
  });

  test('Pattern.toRegex', () => {
    const p = token(/abc/);
    assert.ok(p.toRegex() instanceof RegExp);
  });
});

describe('api (default export)', () => {
  test('default.carol', () => {
    assert.strictEqual(_default.token(/abc/).source, 'abc');
  });

  test('default.Pattern', () => {
    assert.strictEqual(new _default.Pattern('abc').source, 'abc');
  });

  test('default.seq', () => {
    assert.strictEqual(_default.seq([_default.token(/abc/), _default.token(/xyz/)]).source, 'abcxyz');
  });

  test('default.alt', () => {
    assert.strictEqual(_default.alt([_default.token(/abc/), _default.token(/xyz/)]).source, '(?:abc|xyz)');
  });
});
