import { execSync } from 'child_process';

execSync('mkdir -p dist');
execSync('cp ./src/carol.d.ts ./dist/carol.d.ts');
execSync('npx uglifyjs ./src/carol.js -o ./dist/carol.js -c -m --keep-fargs --keep-fnames --comments /^!/');

console.log('Done');
