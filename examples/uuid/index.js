import carol from 'carol-js';
import assert from 'node:assert';

const hex = carol(/[0-9a-f][0-9a-f]/);
const uuid = carol.seq([
  hex.many({ length: 4 }),
  carol(/-/),
  hex.many({ length: 2 }),
  carol(/-/),
  hex.many({ length: 2 }),
  carol(/-/),
  hex.many({ length: 2 }),
  carol(/-/),
  hex.many({ length: 6 }),
]);
const regex = uuid.toRegex({ flags: "i", exact: true });

console.log(`regex: ${regex}`);

assert.strictEqual(
  regex.source,
  "^(?:[0-9a-f][0-9a-f]){4}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){2}-(?:[0-9a-f][0-9a-f]){6}$"
);
assert.strictEqual(regex.flags, "i");
console.log("test ok");
