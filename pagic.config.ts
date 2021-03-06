export default {
  exclude: ['api', 'components', 'lib', 'pages', 'public','style', 'app.tsx'],
  root: "/deno-ssg-blog/",
  title: "Pagic ssg Blog",  description: 'Welcome to my blog, where I have collected my technical articles and life insights.',
  theme: "blog",
  plugins: ['blog'],
   nav: [    {      text: 'Homepage',      link: '/index.html',      icon: 'czs-home-l',    },    {      text: 'Categories',      link: '/categories/index.html',      icon: 'czs-category-l',    },    {      text: 'Tags',      link: '/tags/index.html',      icon: 'czs-tag-l',    },    
         {      text: 'About',      link: '/about/index.html',      icon: 'czs-about-l',    },    
   ],
  blog: {
   social: {
      github: 'xcatliu/blog',
      email: 'xcatliu@gmail.com',
      twitter: 'xcatliu',
    }
  },
}; 
