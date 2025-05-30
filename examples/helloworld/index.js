import C from 'carol-js';
import assert from 'node:assert';

const helloworld = C.seq([
  C.token(/hello/),
  C.token(/ /),
  C.token(/world/),
  C.token(/!/).many(1),
]).many();

const regex = helloworld.toRegex({ exact: true });

console.log(`regex: ${regex}`);

assert.strictEqual(regex.source, "^(?:hello world(?:!)+)*$");
assert.strictEqual(regex.flags, "");
console.log("test ok");
