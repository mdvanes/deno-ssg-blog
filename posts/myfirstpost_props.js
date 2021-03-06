import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/myfirstpost.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/myfirstpost.html",
    'title': "My First Post",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>My First Post</h1>\n<p>On this wonderful Pagic powered blog</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "My First Post"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>On this wonderful Pagic powered blog</p>'
        } }),
    'toc': null,
    'author': "mdvanes",
    'contributors': [
        "mdvanes"
    ],
    'date': "2021-03-06T12:09:38.000Z",
    'updated': null,
    'excerpt': "On this wonderful Pagic powered blog",
    'cover': undefined,
    'categories': [
        "Programming"
    ],
    'tags': [
        "Code quality",
        "Code complexity"
    ],
    'blog': {
        "isPost": true,
        "posts": [
            {
                "pagePath": "posts/myfirstpost.md",
                "title": "My First Post",
                "link": "posts/myfirstpost.html",
                "date": "2021-03-06T12:09:38.000Z",
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
            }
        ]
    }
};
