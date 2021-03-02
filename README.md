A simple website to test Aleph & Deno.

Uses Material UI, React, Aleph, Deno.

# Usage

- Install Deno
- Install Aleph: `deno install -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts`
- Run locally: `alph dev`
- Initialize new project: `aleph init codestar-website-aleph`
- Format (alternative to prettier): `deno fmt components/*.tsx api/*.tsx lib/*.tsx pages/*.tsx`
- Lint (alternative to eslint): `deno lint components/* --unstable`

# Todo

- Use this feed and render blog https://medium.com/feed/codestar-blog
- SSR/SSG build and release with Github Actions (Deno)
- API call
- Fix about.md

# Notes

- `aleph dev` is very slow on first run, very fast on subsequent run
- it does not seem very stable: it crashes a lot when running `aleph dev` is hot updating
- how to keep material-ui version imports in sync over files? import_map.json?
- code completion does not work, e.g. proptypes on CardHeader
- build breaks when about.md is in pages dir (to fix), or when Mui Icons font is imported in app.tsx (workaround available)

# Result

```
aleph init codestar-website-aleph
Download https://deno.land/x/aleph@v0.3.0-alpha.1/cli/init.ts
Check https://deno.land/x/aleph@v0.3.0-alpha.1/cli/init.ts
Add recommended VS Code workspace settings? [y/n] y
Downloading template...
Saving template...
Done
---
Aleph.js is ready to Go.
$ cd codestar-website-aleph
$ aleph dev     # start the app in `development` mode
$ aleph start   # start the app in `production` mode
$ aleph build   # build the app to a static site (SSG)
---
```
