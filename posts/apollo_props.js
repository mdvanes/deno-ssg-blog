import projectConfig from '/deno-ssg-blog/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "posts/apollo.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/apollo.html",
    'title': "Apollo in practice",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<hr>\n<p>categories:</p>\n<ul>\n<li>Programming\ntags:</li>\n<li>Code quality</li>\n<li>Code complexity</li>\n</ul>\n<hr>\n<h1>Apollo in practice</h1>\n<p>Some time ago I joined a team that is working on a search application. The application takes search terms and displays\nthe results in a table with potentially dozens of columns and hundreds   of rows, even before pagination. It is implemented in React and uses <a href="https://www.apollographql.com/">Apollo</a> for\nGraphQL calls. I was surprised to find it noticeably slow when a lot of search results were retrieved. React is\nwell-known for leveraging virtual DOM to optimize performance and GraphQL should even be able to add caching to further\noptimize performance on the side of network requests.<br>\nLooking into the performance tab of Chrome dev tools lead me to believe the performance problems were caused by\ncomputations in the bottom components (e.g. formatting in cells). Because there are so many and they are\nre-rendered quite often, this approach is quite intensive on resources.\nBesides that, the application had obvious state synchronization problems. When moving between views it was not\nmaintaining the same state of selected rows. Even though Redux was used to store application state and communicate it\nbetween components, it was not used consistently. There were still plenty of React class components that stored some parts of the state locally.<br>\nTo summarize, there were two issues that needed to be solved:</p>\n<ol>\n<li>Poor performance due to excessive re-rendering</li>\n<li>Loss of application state when navigating views due to decentralized state stores\nSince both issues were caused by (a lack of) architecture, we redesigned the structure of the application. The original implementation used:</li>\n</ol>\n<ul>\n<li><a href="https://www.apollographql.com">Apollo Client</a> as a GraphQL client</li>\n<li><a href="https://github.com/axios/axios">Axios</a> as an HTTP client for REST endpoints</li>\n<li><a href="https://redux.js.org">Redux</a> and <a href="https://reactjs.org/docs/hooks-reference.html#usestate">React local state</a> to manage the state between components\nIt used Apollo, but by <a href="https://www.apollographql.com/docs/react/essentials/queries#manual-query">manually firing</a> <code>client.query()</code> and\nafter processing the response, it stored the result in the Redux store.</li>\n</ul>\n<h1>Fixing application state with Apollo Local State</h1>\n<p>When restructuring the application, Apollo Client was updated to 2.5. This version has a built-in <a href="https://www.apollographql.com/docs/react/essentials/local-state">local state manager</a>\n(formerly <em>apollo-link-state</em>) and it supports REST calls with the <a href="https://www.apollographql.com/docs/link/links/rest">apollo-link-rest</a> plugin.\nThe <a href="https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost">apollo-boost</a> package contains the\nclient and several useful plugins. Adopting these means that both Redux and Axios can be removed and Apollo will be\nused as a single source of truth. If there is a single store for the data, there is no need for synchronization and\nwith that one of the issues is solved.<br>\nThe way we used Apollo Client was also updated, to create a better separation of UI and data. Instead of using <code>client.query()</code>\ndirectly in the component lifecycle methods, components are split into a presentational component and enhanced with the\n<a href="https://www.apollographql.com/docs/react/api/react-apollo#graphql">graphql()</a> HOC to add data from remote (i.e. GraphQL\nback-end) or local fields. Both utilize the Apollo cache, which fulfills multiple functions, one of them an application local state store.\nExample of wrapping a component in a Query HOC:</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Books</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> books <span class="token punctuation">}</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>   <span class="token operator">&lt;</span>ul<span class="token operator">></span>     <span class="token punctuation">{</span>books<span class="token punctuation">.</span><span class="token method function property-access">map</span><span class="token punctuation">(</span><span class="token parameter">book</span> <span class="token arrow operator">=></span> <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token punctuation">{</span>book<span class="token punctuation">.</span><span class="token property-access">title</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span><span class="token punctuation">}</span>   <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n<span class="token keyword module">export</span> <span class="token function">graphql</span><span class="token punctuation">(</span><span class="token punctuation">{</span> query<span class="token operator">:</span> gql<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token graphql language-graphql">   <span class="token keyword">query</span><span class="token punctuation">(</span><span class="token variable">$author</span><span class="token punctuation">:</span> String<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>     books<span class="token punctuation">(</span><span class="token attr-name">author</span><span class="token punctuation">:</span> <span class="token variable">$author</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>      title     <span class="token punctuation">}</span>   <span class="token punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>    variables<span class="token operator">:</span> <span class="token punctuation">{</span> author<span class="token operator">:</span> <span class="token string">"Mickiewicz"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token maybe-class-name">Books</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>Apollo reactively updates when using <code>Query</code> as a container, basically like the <code>connect</code> HOC in Redux. When\nthe <code>variables</code> prop on the <code>Query</code> component is updated, it will automatically re-query. It uses the cache if possible and  falls back to a network call if needed, although this behavior can be configured.</p>\n<h1>Improving performance with Local Field Resolvers</h1>\n<p>Having a single source of truth fixes the state synchronization problem. It also paves the way for improving the\nperformance. In general, when a lot of data enters the application, it is a good idea to format it once and cascade the\nformatted data down to the components and it\'s descendants with as little transformations to the data itself. This\nreduces the amount of computations in the lower components, which solves our other issue.\nWhen using Redux, a common way to transform data in the store is using\n<a href="https://github.com/reduxjs/reselect">Reselect</a>, which computes derived data from the Redux store with selectors. For\nApollo this is done by:</p>\n<ul>\n<li>wrapping the table in a <code>Query</code> that queries a local prop <code>rows @client</code>, using the <a href="https://www.apollographql.com/docs/react/essentials/local-state">@client</a> directive</li>\n<li>making client side resolvers for rows that queries GraphQL endpoint</li>\n<li>mapping the data in a resolver from a raw format to a format ready for the table components, e.g.:\nfrom a data object</li>\n</ul>\n<pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>    author<span class="token operator">:</span> <span class="token string">"Mickiewicz"</span><span class="token punctuation">,</span>    publications<span class="token operator">:</span> <span class="token punctuation">[</span>      <span class="token punctuation">{</span>        title<span class="token operator">:</span> <span class="token string">"Pan Tadeusz"</span><span class="token punctuation">,</span>       date<span class="token operator">:</span> <span class="token operator">-</span><span class="token number">4291747200</span>      <span class="token punctuation">}</span>    <span class="token punctuation">]</span> \n<span class="token punctuation">}</span>\n</code></pre>\n<p>to an array rows of cells</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">[</span>   <span class="token punctuation">[</span> <span class="token string">"Mickiewicz"</span><span class="token punctuation">,</span> <span class="token string">"Pan Tadeusz"</span><span class="token punctuation">,</span> <span class="token string">"January 1834"</span> <span class="token punctuation">]</span>\n<span class="token punctuation">]</span>\n</code></pre>\n<h1>Next steps</h1>\n<p>Apollo is excellent for merging data from multiple sources (in this case GraphQL, REST, local state and cache) and\nfunctions as a &quot;single source of truth&quot; which should solve the state synchronization problems. The local fields that\nApollo uses in its local state manager can derive data, moving expensive operations from component render functions\nto resolvers in its application level cache. Although the issues mentioned in the introduction are now dealt with, we did\nencounter plenty of other issues I may dive into later. However, these are some things that you might want to\ntake into account when working with Apollo Client:\nOutside of restructuring the application, we improved performance with <a href="https://github.com/bvaughn/react-virtualized">react-virtualized</a> which speeds up rendering\nlarge tables. Apollo also offers GraphQL pagination. We did not use that, as we\nhave to do our pagination on the client side to keep the sorting feature of react-virtualized in tact.\nApollo Client offers support for TypeScript, it is even possible to generate queries and typed React components from\nGraphQL schemas with <a href="https://graphql-code-generator.com/">@graphql-codegen/cli</a>.\nAlso definitely use the <a href="https://jimkyndemeyer.github.io/js-graphql-intellij-plugin/">JS GraphQL IntelliJ Plugin</a> because\nit will not only auto complete queries, but it will help you think about (client side) schema\'s.\nWhen the <code>Query</code> component mounts, it creates an observable that subscribes to the query in the query prop. This\nencourages reactive behavior like RxJS (which can also be used as a <a href="https://github.com/mdvanes/realtime-planner">state store</a>).\nHowever, it seems that Apollo offers much less fine-grained control over the observables than what RxJS provides. And considering observables, Apollo Client\neffortlessly <a href="https://www.apollographql.com/docs/link/links/ws">scales to web sockets</a>!\nAre you looking for inspiration on how Apollo client can be applied? I can recommend\n<a href="https://www.youtube.com/watch?v=g6Mhm9W76jY">this talk by Uri Goldshtein</a> and this <a href="https://www.youtube.com/watch?v=2RvRcnD8wHY">introduction to Apollo state\nmanagement by Sara Vieira</a>.</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/deno-ssg-blog/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<hr>\n<p>categories:</p>\n<ul>\n<li>Programming\ntags:</li>\n<li>Code quality</li>\n<li>Code complexity</li>\n</ul>\n<hr>\n<h1>Apollo in practice</h1>\n<p>Some time ago I joined a team that is working on a search application. The application takes search terms and displays\nthe results in a table with potentially dozens of columns and hundreds   of rows, even before pagination. It is implemented in React and uses <a href="https://www.apollographql.com/">Apollo</a> for\nGraphQL calls. I was surprised to find it noticeably slow when a lot of search results were retrieved. React is\nwell-known for leveraging virtual DOM to optimize performance and GraphQL should even be able to add caching to further\noptimize performance on the side of network requests.<br>\nLooking into the performance tab of Chrome dev tools lead me to believe the performance problems were caused by\ncomputations in the bottom components (e.g. formatting in cells). Because there are so many and they are\nre-rendered quite often, this approach is quite intensive on resources.\nBesides that, the application had obvious state synchronization problems. When moving between views it was not\nmaintaining the same state of selected rows. Even though Redux was used to store application state and communicate it\nbetween components, it was not used consistently. There were still plenty of React class components that stored some parts of the state locally.<br>\nTo summarize, there were two issues that needed to be solved:</p>\n<ol>\n<li>Poor performance due to excessive re-rendering</li>\n<li>Loss of application state when navigating views due to decentralized state stores\nSince both issues were caused by (a lack of) architecture, we redesigned the structure of the application. The original implementation used:</li>\n</ol>\n<ul>\n<li><a href="https://www.apollographql.com">Apollo Client</a> as a GraphQL client</li>\n<li><a href="https://github.com/axios/axios">Axios</a> as an HTTP client for REST endpoints</li>\n<li><a href="https://redux.js.org">Redux</a> and <a href="https://reactjs.org/docs/hooks-reference.html#usestate">React local state</a> to manage the state between components\nIt used Apollo, but by <a href="https://www.apollographql.com/docs/react/essentials/queries#manual-query">manually firing</a> <code>client.query()</code> and\nafter processing the response, it stored the result in the Redux store.</li>\n</ul>\n<h1>Fixing application state with Apollo Local State</h1>\n<p>When restructuring the application, Apollo Client was updated to 2.5. This version has a built-in <a href="https://www.apollographql.com/docs/react/essentials/local-state">local state manager</a>\n(formerly <em>apollo-link-state</em>) and it supports REST calls with the <a href="https://www.apollographql.com/docs/link/links/rest">apollo-link-rest</a> plugin.\nThe <a href="https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost">apollo-boost</a> package contains the\nclient and several useful plugins. Adopting these means that both Redux and Axios can be removed and Apollo will be\nused as a single source of truth. If there is a single store for the data, there is no need for synchronization and\nwith that one of the issues is solved.<br>\nThe way we used Apollo Client was also updated, to create a better separation of UI and data. Instead of using <code>client.query()</code>\ndirectly in the component lifecycle methods, components are split into a presentational component and enhanced with the\n<a href="https://www.apollographql.com/docs/react/api/react-apollo#graphql">graphql()</a> HOC to add data from remote (i.e. GraphQL\nback-end) or local fields. Both utilize the Apollo cache, which fulfills multiple functions, one of them an application local state store.\nExample of wrapping a component in a Query HOC:</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Books</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> books <span class="token punctuation">}</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>   <span class="token operator">&lt;</span>ul<span class="token operator">></span>     <span class="token punctuation">{</span>books<span class="token punctuation">.</span><span class="token method function property-access">map</span><span class="token punctuation">(</span><span class="token parameter">book</span> <span class="token arrow operator">=></span> <span class="token operator">&lt;</span>li<span class="token operator">></span><span class="token punctuation">{</span>book<span class="token punctuation">.</span><span class="token property-access">title</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span><span class="token punctuation">}</span>   <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span> \n<span class="token keyword module">export</span> <span class="token function">graphql</span><span class="token punctuation">(</span><span class="token punctuation">{</span> query<span class="token operator">:</span> gql<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token graphql language-graphql">   <span class="token keyword">query</span><span class="token punctuation">(</span><span class="token variable">$author</span><span class="token punctuation">:</span> String<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>     books<span class="token punctuation">(</span><span class="token attr-name">author</span><span class="token punctuation">:</span> <span class="token variable">$author</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>      title     <span class="token punctuation">}</span>   <span class="token punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>    variables<span class="token operator">:</span> <span class="token punctuation">{</span> author<span class="token operator">:</span> <span class="token string">"Mickiewicz"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token maybe-class-name">Books</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>Apollo reactively updates when using <code>Query</code> as a container, basically like the <code>connect</code> HOC in Redux. When\nthe <code>variables</code> prop on the <code>Query</code> component is updated, it will automatically re-query. It uses the cache if possible and  falls back to a network call if needed, although this behavior can be configured.</p>\n<h1>Improving performance with Local Field Resolvers</h1>\n<p>Having a single source of truth fixes the state synchronization problem. It also paves the way for improving the\nperformance. In general, when a lot of data enters the application, it is a good idea to format it once and cascade the\nformatted data down to the components and it\'s descendants with as little transformations to the data itself. This\nreduces the amount of computations in the lower components, which solves our other issue.\nWhen using Redux, a common way to transform data in the store is using\n<a href="https://github.com/reduxjs/reselect">Reselect</a>, which computes derived data from the Redux store with selectors. For\nApollo this is done by:</p>\n<ul>\n<li>wrapping the table in a <code>Query</code> that queries a local prop <code>rows @client</code>, using the <a href="https://www.apollographql.com/docs/react/essentials/local-state">@client</a> directive</li>\n<li>making client side resolvers for rows that queries GraphQL endpoint</li>\n<li>mapping the data in a resolver from a raw format to a format ready for the table components, e.g.:\nfrom a data object</li>\n</ul>\n<pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>    author<span class="token operator">:</span> <span class="token string">"Mickiewicz"</span><span class="token punctuation">,</span>    publications<span class="token operator">:</span> <span class="token punctuation">[</span>      <span class="token punctuation">{</span>        title<span class="token operator">:</span> <span class="token string">"Pan Tadeusz"</span><span class="token punctuation">,</span>       date<span class="token operator">:</span> <span class="token operator">-</span><span class="token number">4291747200</span>      <span class="token punctuation">}</span>    <span class="token punctuation">]</span> \n<span class="token punctuation">}</span>\n</code></pre>\n<p>to an array rows of cells</p>\n<pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">[</span>   <span class="token punctuation">[</span> <span class="token string">"Mickiewicz"</span><span class="token punctuation">,</span> <span class="token string">"Pan Tadeusz"</span><span class="token punctuation">,</span> <span class="token string">"January 1834"</span> <span class="token punctuation">]</span>\n<span class="token punctuation">]</span>\n</code></pre>\n<h1>Next steps</h1>\n<p>Apollo is excellent for merging data from multiple sources (in this case GraphQL, REST, local state and cache) and\nfunctions as a &quot;single source of truth&quot; which should solve the state synchronization problems. The local fields that\nApollo uses in its local state manager can derive data, moving expensive operations from component render functions\nto resolvers in its application level cache. Although the issues mentioned in the introduction are now dealt with, we did\nencounter plenty of other issues I may dive into later. However, these are some things that you might want to\ntake into account when working with Apollo Client:\nOutside of restructuring the application, we improved performance with <a href="https://github.com/bvaughn/react-virtualized">react-virtualized</a> which speeds up rendering\nlarge tables. Apollo also offers GraphQL pagination. We did not use that, as we\nhave to do our pagination on the client side to keep the sorting feature of react-virtualized in tact.\nApollo Client offers support for TypeScript, it is even possible to generate queries and typed React components from\nGraphQL schemas with <a href="https://graphql-code-generator.com/">@graphql-codegen/cli</a>.\nAlso definitely use the <a href="https://jimkyndemeyer.github.io/js-graphql-intellij-plugin/">JS GraphQL IntelliJ Plugin</a> because\nit will not only auto complete queries, but it will help you think about (client side) schema\'s.\nWhen the <code>Query</code> component mounts, it creates an observable that subscribes to the query in the query prop. This\nencourages reactive behavior like RxJS (which can also be used as a <a href="https://github.com/mdvanes/realtime-planner">state store</a>).\nHowever, it seems that Apollo offers much less fine-grained control over the observables than what RxJS provides. And considering observables, Apollo Client\neffortlessly <a href="https://www.apollographql.com/docs/link/links/ws">scales to web sockets</a>!\nAre you looking for inspiration on how Apollo client can be applied? I can recommend\n<a href="https://www.youtube.com/watch?v=g6Mhm9W76jY">this talk by Uri Goldshtein</a> and this <a href="https://www.youtube.com/watch?v=2RvRcnD8wHY">introduction to Apollo state\nmanagement by Sara Vieira</a>.</p>'
        } }),
    'toc': null,
    'author': "mdvanes",
    'contributors': [
        "mdvanes"
    ],
    'date': "2021-03-06T12:26:03.000Z",
    'updated': null,
    'excerpt': "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------...",
    'cover': undefined,
    'blog': {
        "isPost": true,
        "posts": [
            {
                "pagePath": "posts/rootaccess.md",
                "title": "Gaining Root Access to Smart Home Gateway",
                "link": "posts/rootaccess.html",
                "date": "2021-03-06T12:26:03.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
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
                "date": "2021-03-06T12:26:03.000Z",
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
            },
            {
                "pagePath": "posts/apollo.md",
                "title": "Apollo in practice",
                "link": "posts/apollo.html",
                "date": "2021-03-06T12:26:03.000Z",
                "updated": null,
                "author": "mdvanes",
                "contributors": [
                    "mdvanes"
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
