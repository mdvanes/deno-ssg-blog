import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "categories/README.md",
    'layoutPath': "categories/_layout.tsx",
    'outputPath': "categories/index.html",
    'title': "Categories",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Categories</h1>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Categories"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: ''
        } }),
    'toc': null,
    'author': "M.D. van Es",
    'contributors': [
        "M.D. van Es"
    ],
    'date': "2021-03-23T12:09:52.000Z",
    'updated': null,
    'excerpt': "",
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
