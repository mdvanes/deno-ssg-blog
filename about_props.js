import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "about.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "about.html",
    'title': "About",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><a href="/">home</a>\n<a href="/publications">publications</a>\n<a href="/about">about</a></p>\n<h1>About</h1>\n<p>Aleph should support &quot;Markdown pages&quot;, see <a href="https://alephjs.org/docs/basic-features/pages">the docs</a>, just like Next and Gatsby.</p>\n<p>However, so far it gives a 404 when navigating to /about.</p>\n<p>It does not (yet) seem to support an automatic list of pages, so links must be added manually, in this case in AppTopBar.tsx.</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><a href="/">home</a>\n<a href="/publications">publications</a>\n<a href="/about">about</a></p>\n<h1>About</h1>\n<p>Aleph should support &quot;Markdown pages&quot;, see <a href="https://alephjs.org/docs/basic-features/pages">the docs</a>, just like Next and Gatsby.</p>\n<p>However, so far it gives a 404 when navigating to /about.</p>\n<p>It does not (yet) seem to support an automatic list of pages, so links must be added manually, in this case in AppTopBar.tsx.</p>'
        } }),
    'toc': null,
    'author': "M.D. van Es",
    'contributors': [
        "M.D. van Es"
    ],
    'date': "2021-03-23T12:09:52.000Z",
    'updated': null,
    'excerpt': "home publications about About Aleph should support \"Markdown pages\", see the docs, just like Next and Gatsby. However, so far it gives a 404 when navigating to /about. It does not (yet) seem to support an autom...",
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
