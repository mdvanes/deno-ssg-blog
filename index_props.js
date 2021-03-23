import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "Pagic SSG Blog",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>A simple website to test Aleph &amp; Deno.</p>\n<p>Uses Material UI, React, Aleph, Deno.</p>\n<h1>Pagic SSG Blog</h1>\n<ul>\n<li>Install Deno</li>\n<li>Install Aleph deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic <a href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a></li>\n<li>Install Velociraptor: deno install -qA -n vr <a href="https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts">https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts</a></li>\n<li>Start dev server from scripts.yaml: <code>vr start</code></li>\n<li>Build for production from scripts.yaml: <code>vr build</code></li>\n</ul>\n<h1>Aleph SSG Blog</h1>\n<ul>\n<li>Install Deno</li>\n<li>Install Aleph: <code>deno install -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts</code></li>\n<li>Run locally: <code>alph dev</code></li>\n<li>Initialize new project: <code>aleph init codestar-website-aleph</code></li>\n<li>Format (alternative to prettier): <code>deno fmt components/*.tsx api/*.tsx lib/*.tsx pages/*.tsx</code></li>\n<li>Lint (alternative to eslint): <code>deno lint components/* --unstable</code></li>\n</ul>\n<h1>Todo</h1>\n<ul>\n<li>Pagic API call</li>\n<li>Pagic <a href="https://deno.land/x/pagic">https://deno.land/x/pagic</a></li>\n<li>dvm deno.land: Deno version manager</li>\n<li>velociraptor deno.land: scripts <a href="https://deno.land/x/velociraptor">https://deno.land/x/velociraptor</a>\n<ul>\n<li>$ deno install -qA -n vr <a href="https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts">https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts</a></li>\n<li>scripts.yaml</li>\n</ul>\n</li>\n<li>autopilot deno.land: desktop automation</li>\n<li>build can\'t resolve .js etc when deployed because it is not inserting /codestar-website-aleph/ into the path. It can only run from the root path.</li>\n<li>aleph@v0.3.0-alpha.6 builds but gives runtime errors. .7 and .8 do not build.</li>\n<li>Use this feed and render blog <a href="https://medium.com/feed/codestar-blog">https://medium.com/feed/codestar-blog</a></li>\n<li>SSR/SSG build and release with Github Actions (Deno)</li>\n<li>API call</li>\n<li>Fix <a href="http://about.md">about.md</a></li>\n</ul>\n<h1>Notes</h1>\n<ul>\n<li><code>aleph dev</code> is very slow on first run, very fast on subsequent run</li>\n<li>it does not seem very stable: it crashes a lot when running <code>aleph dev</code> is hot updating</li>\n<li>how to keep material-ui version imports in sync over files? import_map.json?</li>\n<li>code completion does not work, e.g. proptypes on CardHeader</li>\n<li>build breaks when <a href="http://about.md">about.md</a> is in pages dir (to fix), or when Mui Icons font is imported in app.tsx (workaround available)</li>\n</ul>\n<h1>Result</h1>\n<pre class="language-autoit"><code class="language-autoit">aleph init codestar<span class="token operator">-</span>website<span class="token operator">-</span>aleph\nDownload https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>deno<span class="token punctuation">.</span>land<span class="token operator">/</span>x<span class="token operator">/</span>aleph<span class="token variable">@v0</span><span class="token punctuation">.</span><span class="token number">3.0</span><span class="token operator">-</span>alpha<span class="token punctuation">.</span><span class="token number">1</span><span class="token operator">/</span>cli<span class="token operator">/</span>init<span class="token punctuation">.</span>ts\nCheck https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>deno<span class="token punctuation">.</span>land<span class="token operator">/</span>x<span class="token operator">/</span>aleph<span class="token variable">@v0</span><span class="token punctuation">.</span><span class="token number">3.0</span><span class="token operator">-</span>alpha<span class="token punctuation">.</span><span class="token number">1</span><span class="token operator">/</span>cli<span class="token operator">/</span>init<span class="token punctuation">.</span>ts\nAdd recommended VS Code workspace settings<span class="token operator">?</span> <span class="token punctuation">[</span>y<span class="token operator">/</span>n<span class="token punctuation">]</span> y\nDownloading template<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\nSaving template<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\nDone\n<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>\nAleph<span class="token punctuation">.</span>js is ready <span class="token keyword">to</span> Go<span class="token punctuation">.</span>\n$ cd codestar<span class="token operator">-</span>website<span class="token operator">-</span>aleph\n$ aleph dev     # start the app <span class="token keyword">in</span> `development` mode\n$ aleph start   # start the app <span class="token keyword">in</span> `production` mode\n$ aleph build   # build the app <span class="token keyword">to</span> a <span class="token keyword">static</span> site <span class="token punctuation">(</span>SSG<span class="token punctuation">)</span>\n<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>\n</code></pre>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>A simple website to test Aleph &amp; Deno.</p>\n<p>Uses Material UI, React, Aleph, Deno.</p>\n<h1>Pagic SSG Blog</h1>\n<ul>\n<li>Install Deno</li>\n<li>Install Aleph deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic <a href="https://deno.land/x/pagic/mod.ts">https://deno.land/x/pagic/mod.ts</a></li>\n<li>Install Velociraptor: deno install -qA -n vr <a href="https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts">https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts</a></li>\n<li>Start dev server from scripts.yaml: <code>vr start</code></li>\n<li>Build for production from scripts.yaml: <code>vr build</code></li>\n</ul>\n<h1>Aleph SSG Blog</h1>\n<ul>\n<li>Install Deno</li>\n<li>Install Aleph: <code>deno install -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.1/cli.ts</code></li>\n<li>Run locally: <code>alph dev</code></li>\n<li>Initialize new project: <code>aleph init codestar-website-aleph</code></li>\n<li>Format (alternative to prettier): <code>deno fmt components/*.tsx api/*.tsx lib/*.tsx pages/*.tsx</code></li>\n<li>Lint (alternative to eslint): <code>deno lint components/* --unstable</code></li>\n</ul>\n<h1>Todo</h1>\n<ul>\n<li>Pagic API call</li>\n<li>Pagic <a href="https://deno.land/x/pagic">https://deno.land/x/pagic</a></li>\n<li>dvm deno.land: Deno version manager</li>\n<li>velociraptor deno.land: scripts <a href="https://deno.land/x/velociraptor">https://deno.land/x/velociraptor</a>\n<ul>\n<li>$ deno install -qA -n vr <a href="https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts">https://deno.land/x/velociraptor@1.0.0-beta.18/cli.ts</a></li>\n<li>scripts.yaml</li>\n</ul>\n</li>\n<li>autopilot deno.land: desktop automation</li>\n<li>build can\'t resolve .js etc when deployed because it is not inserting /codestar-website-aleph/ into the path. It can only run from the root path.</li>\n<li>aleph@v0.3.0-alpha.6 builds but gives runtime errors. .7 and .8 do not build.</li>\n<li>Use this feed and render blog <a href="https://medium.com/feed/codestar-blog">https://medium.com/feed/codestar-blog</a></li>\n<li>SSR/SSG build and release with Github Actions (Deno)</li>\n<li>API call</li>\n<li>Fix <a href="http://about.md">about.md</a></li>\n</ul>\n<h1>Notes</h1>\n<ul>\n<li><code>aleph dev</code> is very slow on first run, very fast on subsequent run</li>\n<li>it does not seem very stable: it crashes a lot when running <code>aleph dev</code> is hot updating</li>\n<li>how to keep material-ui version imports in sync over files? import_map.json?</li>\n<li>code completion does not work, e.g. proptypes on CardHeader</li>\n<li>build breaks when <a href="http://about.md">about.md</a> is in pages dir (to fix), or when Mui Icons font is imported in app.tsx (workaround available)</li>\n</ul>\n<h1>Result</h1>\n<pre class="language-autoit"><code class="language-autoit">aleph init codestar<span class="token operator">-</span>website<span class="token operator">-</span>aleph\nDownload https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>deno<span class="token punctuation">.</span>land<span class="token operator">/</span>x<span class="token operator">/</span>aleph<span class="token variable">@v0</span><span class="token punctuation">.</span><span class="token number">3.0</span><span class="token operator">-</span>alpha<span class="token punctuation">.</span><span class="token number">1</span><span class="token operator">/</span>cli<span class="token operator">/</span>init<span class="token punctuation">.</span>ts\nCheck https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>deno<span class="token punctuation">.</span>land<span class="token operator">/</span>x<span class="token operator">/</span>aleph<span class="token variable">@v0</span><span class="token punctuation">.</span><span class="token number">3.0</span><span class="token operator">-</span>alpha<span class="token punctuation">.</span><span class="token number">1</span><span class="token operator">/</span>cli<span class="token operator">/</span>init<span class="token punctuation">.</span>ts\nAdd recommended VS Code workspace settings<span class="token operator">?</span> <span class="token punctuation">[</span>y<span class="token operator">/</span>n<span class="token punctuation">]</span> y\nDownloading template<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\nSaving template<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\nDone\n<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>\nAleph<span class="token punctuation">.</span>js is ready <span class="token keyword">to</span> Go<span class="token punctuation">.</span>\n$ cd codestar<span class="token operator">-</span>website<span class="token operator">-</span>aleph\n$ aleph dev     # start the app <span class="token keyword">in</span> `development` mode\n$ aleph start   # start the app <span class="token keyword">in</span> `production` mode\n$ aleph build   # build the app <span class="token keyword">to</span> a <span class="token keyword">static</span> site <span class="token punctuation">(</span>SSG<span class="token punctuation">)</span>\n<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>\n</code></pre>'
        } }),
    'toc': null,
    'author': "M.D. van Es",
    'contributors': [
        "M.D. van Es"
    ],
    'date': "2021-03-23T12:09:52.000Z",
    'updated': null,
    'excerpt': "A simple website to test Aleph & Deno. Uses Material UI, React, Aleph, Deno. Pagic SSG Blog - Install Deno - Install Aleph deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic...",
    'cover': undefined,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/rootaccess.md",
                "title": "Gaining Root Access to Smart Home Gateway",
                "link": "posts/rootaccess.html",
                "date": "2021-03-23T12:09:52.000Z",
                "updated": null,
                "author": "M.D. van Es",
                "contributors": [
                    "M.D. van Es"
                ],
                "categories": [
                    "mypc"
                ],
                "tags": [
                    "Code quality",
                    "Code complexity"
                ],
                "excerpt": "cover Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer. When delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just..."
            },
            {
                "pagePath": "posts/myfirstpost.md",
                "title": "My First Post",
                "link": "posts/myfirstpost.html",
                "date": "2021-03-23T12:09:52.000Z",
                "updated": null,
                "author": "M.D. van Es",
                "contributors": [
                    "M.D. van Es"
                ],
                "categories": [
                    "Programming"
                ],
                "tags": [
                    "Code quality",
                    "Code complexity"
                ],
                "excerpt": "On this wonderful Pagic powered blog"
            },
            {
                "pagePath": "posts/apollo.md",
                "title": "Apollo in practice",
                "link": "posts/apollo.html",
                "date": "2021-03-23T12:09:52.000Z",
                "updated": null,
                "author": "M.D. van Es",
                "contributors": [
                    "M.D. van Es"
                ],
                "excerpt": "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------..."
            }
        ],
        "categories": [
            {
                "name": "mypc",
                "count": 1
            },
            {
                "name": "Programming",
                "count": 1
            }
        ],
        "tags": [
            {
                "name": "Code complexity",
                "count": 2
            },
            {
                "name": "Code quality",
                "count": 2
            }
        ]
    }
};
