/// <reference path="../dist/carol.d.ts" />

import assert from 'node:assert';
import _default, { carol, Pattern, alt, seq } from 'carol-js';

assert.ok(typeof carol === 'function');
assert.ok(Pattern != null);
assert.ok(alt != null);
assert.ok(seq != null);

assert.ok(typeof _default === 'function');
assert.ok(_default.carol != null);
assert.ok(_default.Pattern != null);
assert.ok(_default.alt != null);
assert.ok(_default.seq != null);

const p = carol(/abc/);
assert.ok(p.many != null);
assert.ok(p.option != null);
assert.ok(p.capture != null);
assert.ok(p.toRegex != null);
assert.ok(p.source != null);
