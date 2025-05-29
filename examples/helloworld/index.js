import carol from 'carol-js';
import assert from 'node:assert';

function complete(inner) {
  return carol.seq([
    carol(/^/),
    inner,
    carol(/$/),
  ]);
}

const helloworld = carol.seq([
  carol(/hello/),
  carol(/ /),
  carol(/world/),
  carol(/!/).many(1),
]).many();

const regex = complete(helloworld).toRegex();

console.log(`regex: ${regex}`);

assert.strictEqual(regex.test("hello world!"), true);
assert.strictEqual(regex.test("hello world"), false);
console.log("test ok");
