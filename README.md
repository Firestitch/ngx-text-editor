# @firestitch/text-editor

## Monaco assets

The package carries only the Monaco build the editor loads (`min/vs`, through Monaco's AMD
loader) and Monaco's license notices. `npm run package` copies them from `monaco-editor` into
`package/assets/monaco-editor` (`scripts/copy-monaco-assets.mjs`, run as `postpackage`).

The app copies them to `/assets/monaco-editor/` in `angular.json`:
```json
{
  "glob": "**/*",
  "input": "./node_modules/@firestitch/text-editor/assets/monaco-editor",
  "output": "./assets/monaco-editor"
}
```
