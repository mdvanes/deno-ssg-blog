import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "categories/Programming/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "categories/Programming/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'title': "Programming",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/myfirstpost.md",
                "title": "My First Post",
                "link": "posts/myfirstpost.html",
                "date": "2021-03-06T12:15:06.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
                ],
                "categories": [
                    "Programming"
                ],
                "tags": [
                    "Code quality",
                    "Code complexity"
                ],
                "excerpt": "On this wonderful Pagic powered blog"
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
