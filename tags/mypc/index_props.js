import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "tags/mypc/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/mypc/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'title': "mypc",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/rootaccess.md",
                "title": "Gaining Root Access to Smart Home Gateway",
                "link": "posts/rootaccess.html",
                "date": "05-09-2019",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
                ],
                "tags": [
                    "mypc"
                ],
                "excerpt": "Recently I bought a Risco Smart Home Gateway, and as I expected it is a rebranded off-the-shelf micro computer. When delivered, the HDMI and optical S/PDIF outputs and IR input hinted that it was not just a ded...",
                "cover": ""
            }
        ],
        "categories": [
            {
                "name": "Programming",
                "count": 1
            }
        ],
        "tags": [
            {
                "name": "Code complexity",
                "count": 1
            },
            {
                "name": "Code quality",
                "count": 1
            },
            {
                "name": "mypc",
                "count": 1
            }
        ]
    }
};
