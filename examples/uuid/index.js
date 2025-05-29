import carol, { seq } from 'carol-js';
import assert from 'node:assert';

const hex = carol(/[0-9a-f][0-9a-f]/);
const uuid = seq([
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
const regex = uuid.toRegex("i");

console.log(`regex: ${regex}`);

assert.strictEqual(regex.test("550e8400-e29b-41d4-a716-446655440000"), true);
assert.strictEqual(regex.test("550e8400-e29be29b-41d4-a716-446655440000"), false);
console.log("test ok");
