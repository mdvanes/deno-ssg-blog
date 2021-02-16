A simple website to test Aleph & Deno.

Uses Material UI, React, Aleph, Deno.

# Todo

* Use Material UI through esm.sh
* Use this feed: https://medium.com/feed/codestar-blog
* SSR/SSG build and release with Github Actions (Deno)
* API call

# Notes

* `aleph dev` is very slow on first run, very fast on subsequent run
* it does not seem very stable: it crashes a lot when running `aleph dev` is hot updating
* how to keep material-ui version imports in sync over files? import_map.json?
* code completion does not work, e.g. proptypes on CardHeader

# Result

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