import assert from 'assert';
import carol from 'carol-js';

const regex = carol.seq([
  carol(/hello/),
  carol(/ /),
  carol(/world/),
  carol(/!/).many(1),
]).many().toRegex();

assert.strictEqual(regex.source, '(?:hello world(?:!)+)*');
