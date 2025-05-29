import carol from 'carol-js';
import assert from 'node:assert';

const helloworld = carol.seq([
  carol(/hello/),
  carol(/ /),
  carol(/world/),
  carol(/!/).many(1),
]).many();

const regex = helloworld.toRegex({ exact: true });

console.log(`regex: ${regex}`);

assert.strictEqual(regex.source, "^(?:hello world(?:!)+)*$");
assert.strictEqual(regex.flags, "");
console.log("test ok");
