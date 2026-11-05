// Runs after `npm run package` (postpackage). Puts in package/assets/monaco-editor only the
// build the editor loads (min/vs, through its AMD loader) and Monaco's license notices, so an
// app copies those instead of all of monaco-editor (its esm and dev builds): about 16 MB
// instead of 73 MB.
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const monaco = path.join(root, 'node_modules/monaco-editor');
const dest = path.join(root, 'package/assets/monaco-editor');

const files = [
  'LICENSE',
  'ThirdPartyNotices.txt',
  'min/vs',
];

// A file missing from monaco-editor fails the package rather than ship an editor that 404s
const missing = files.filter((file) => !fs.existsSync(path.join(monaco, file)));
if (missing.length) {
  console.error(`Monaco assets: missing ${missing.join(', ')}`);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
files.forEach((file) => {
  fs.cpSync(path.join(monaco, file), path.join(dest, file), { recursive: true });
});

console.log('Monaco assets: min/vs and license notices in package/assets/monaco-editor');
