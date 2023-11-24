import { execSync } from 'child_process';

execSync('mkdir -p dist');
execSync('cp ./src/carol.d.ts ./dist/carol.d.ts');
execSync('npx uglifyjs -c -m --module --keep-fargs --keep-fnames --comments /^!/ ./src/carol.js -o ./dist/carol.js');

console.log('Done');
