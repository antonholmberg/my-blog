---
path: '/posts/how-i-made-this-blog'
date: 2017-07-12T17:12:33.962Z
title: 'How I Made This Blog'
---

This blog was made with [Gatsby.js](https://www.gatsbyjs.org/). Over all it has
been a blast to make and the fact that I could reuse my react skills made me
feel like I am in control.

There were however some things that took some time to sink in. So I though it might
be nice to create a post about the concepts that were hard for me to grasp.

I started out this blog post thinking it would be more or less a step by step guide of
how the Blog was made. But to be fair there are a lot of these guides out there and most
of them are brilliantly written. So if you are looking for a step by step guide I
would much rather refer you to those:

- [Creating a Blog with Gatsby](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/)
- [Gatsby Official Tutorial](https://www.gatsbyjs.org/tutorial/)

### Initial Starter Pack

So one of the tings I wish that I had done differently was to start out with
the _hello world_ starter pack instead of the default one.

There are a lot of nice things in the default started pack like SEO, Manifest and
all of that goodness. But before I understood how gatsby works, this
initial stuff became rather confusing.

Therefore I strongly recommend anyone who wants to learn [Gatsby.js](https://www.gatsbyjs.org/)
to initialize a project with:

```bash
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

This is also what they recommend in the official tutorial so maybe I should have read
that he he.

### What It Actually Does

So gatsby is a static page generator. It took some time for me to realize what is actually meant.
I thought that it was more or less like writing any other React app.

To wrap my head around this I had to separate the _build time_ from _run time_. At _build time_
[Gatsby.js](https://www.gatsbyjs.org/) pulls in data from different sources and generate
pages from that data. Examples of sources are:

- [Filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
- [Custom API](https://www.gatsbyjs.org/packages/gatsby-source-custom-api/)
- [Github](https://www.gatsbyjs.org/packages/@mosch/gatsby-source-github/)

There are many more of these _source_ plugins but I would advice someone who is just starting out
to go with [filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/).
This is because it makes it is easier create a mental image of how [Gatsby.js](https://www.gatsbyjs.org/)
works. It is easy to understand that these local files are managed at _build time_ and not at _run time_.
The thing that I didn't really understand at first was that even if the _source_ was an API,
**the data was still fetched at _build time_**.

### Pages

Okay so lets talk basics. Pages are the most basic elements in
[Gatsby.js](https://www.gatsbyjs.org/). When you create an app with the _hello world_
starter pack you will only have one page, the _index.js_ page. This page it the one that the
user lands on. Another path will be added for each _page_ that you add in the _pages_ folder.

Let say that I add an about page. [Gatsby.js](https://www.gatsbyjs.org/) will add a path for
_/about_. You can now add a link from _/index_ to _/about_.

```javascript
// index.js
import { Link } from 'gatsby';

const Index = () => (
  <div>
    ...
    <Link to="/about">About</Link>
  </div>
);

export default Index;
```

### GraphQL

So before making this blog I had never really worked with GraphQL on a "_real_" project.
I had played around with [GraphiQL](https://github.com/graphql/graphiql) but that was about
all that I knew.

As I mentioned Gatsby pulls data from your _sources_ at _build time_. Once the data is fetched
it exposes this data though GraphQL. I found that the easiest one to wrap my head around was
once again the [filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/). So
I strongly recommend that you use that one and then play around with some queries in the
[GraphiQL](https://github.com/graphql/graphiql). You can access [GraphiQL](https://github.com/graphql/graphiql)
at [localhost:8000/\_\_\_grapgql](localhost:8000/___grapgql).

GraphQL queries can be used pretty much all over Gatsby and it is really really powerful.

### Transformers

So gatsby has a multitude of _transformers_. What _transformers_ do is to take the
content that the _source_ plugins load and transform them in some way.

I use [remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/). It is
a transformer for markdown (my choice when writing stuff). It takes any markdown available
from the sources and then transforms it in to HTML that can then be queried and displayed.

### Generating Pages From the Sources

So it is quite easy to imagine how a _page_ in the _pages_ directory turns in to html but something
that took a while for me to understand was how to create pages from the data that was fetched by the
_sources_.

The answer was that at _build time_ Gatsby tries to call a function, defined in _gatsby-node.js_, called
_createPages_. In this method you can query for data with GraphQL and then call _createPage_ to create
the page.

I won't go in to much details about how to write this method. If you want to know more I would recommend
reading the official documentation [here](https://www.gatsbyjs.org/tutorial/part-seven/).

### What Finally Made It Click

Okay so the thing that finally made it click for me was to imagine that I was writing a _express_ server
with server side rendering. Gatsby will then pre-cache all the endpoints and stored them in the
_public_ directory.

So adding a file in the _pages_ directory can be seen as writing:

```javascript
app.get('/index');
```

And the _gatsby-node.js_ file can be used to express endpoints that, in a _express_ app, would be dynamic:

```javascript
app.get('/posts/:postId');
```

### Closing Thoughts

Gatsby is amazing! There are a lot of plugins and things that you can add. This can feel daunting at first
but most of these plugins are _nice_ to have but in no way required. So starting out with the basic
_hello world_ starter kit and then adding plugins as you need is probably the best way to get started.

Here is a list of plugins that I currently use, as of writing this post:

- [filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
- [catch-links](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/)
- [react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/)
- [styled-components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/)
- [remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)
- [prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)
- [typography](https://www.gatsbyjs.org/packages/gatsby-plugin-typography/)

I found that, for me, thinking of it as an _express_ server made it click. Hopefully someone else can benefit
from this mental model too.
