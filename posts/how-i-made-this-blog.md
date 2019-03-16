---
path: '/posts/how-i-made-this-blog'
date: 2017-07-12T17:12:33.962Z
title: 'How I Made This Blog'
---

This blog was made with [Gatsby.js](https://www.gatsbyjs.org/) over all it has
been a blast to make it and the fact that I could reuse my react skills maded me
feel like i am in controll.

There were however a quite a lot of things that took some time to sink in. So I
though it might be nice for me to post about it.

### Initial Starter Pack

So one of the tings I wish that I hade done differently is was to start out with
the hello world starter pack instead of the default one.

There are a lot of nice things in the default started pack like SEO, Manifest and
all of that goodness. But before actually understanding how gatsby works, this
initial stuff becomes rather confusing.

Therefore I strongly recommend anyone who wants to learn [Gatsby.js](https://www.gatsbyjs.org/)
to initialize a project with:

```bash
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

### What It Actually Does

So gatsby is a static page generator. This took some time for me to realize, thinking
it was more or less like writing any other React app. We need to sort of separate the
_compile time_ from _run time_. When [Gatsby.js](https://www.gatsbyjs.org/) compiles a
project it pulls in data from different sources. Examples of sources are:

- [Filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
- [Custom API](https://www.gatsbyjs.org/packages/gatsby-source-custom-api/)
- [Github](https://www.gatsbyjs.org/packages/@mosch/gatsby-source-github/)

There are many more of these _source_ plugins. I would advice anyone to just start out
with the file system one. This is because it makes it is easier create a mental image
of how [Gatsby.js](https://www.gatsbyjs.org/) works. It is easy to understand that these
local files are managed at compile time and not at _run time_. The thing that I didn't
really understand at first was that even if the source was an API, **the data was still
fetched at _compile time_**.

### GraphQL

So before making this blog I had never really worked with GraphQL on a "_real_" project.
I had played around with [GraphiQL](https://github.com/graphql/graphiql) but that was about
all I knew.

So like I mentioned Gatsby pulls data from your _sources_ at _compile time_. Once this is done
It exposes this data though GraphQL. I found that the easiest one to wrap my head around was
once again the [filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/).

To add the file system plugin I ran:

`npm install gatsby-source-filesystem`

add added:

`gist:antonholmberg/e272f56992defb4e865dd903463297d5`

So everything I put in the `posts` directory will be sourced by the plugin.

Once this is sourced I can query for the data with GraphQL. I recommend taht you
first use GraphiQL. If you run Gatsby locally this will be available at
[http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql).

A query that fetched all the files currently sourced by the
[filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) plugin
you can run:

`gist:antonholmberg/1290b690717ec870db9c93208cf8134c`

The response from this is for me, as of writing this:

`gist:antonholmberg/37d1afe845a6444b866829b5b390278d`

### Transformers

<div style="margin: 2rem auto; max-width: 480px;">
<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/10AP6GswZpOA4o" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
</div>

So gatsby has a multitude of _transformers_. What _transformers_ do is to take the
content that the _source_ plugins load and transform them in some way.

I use [remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/). It is
a tranformer for markdown (my choise when writing stuff). It takes the markdown I
write and transforms it in to HTML to be displayed in the blog.

I installed the plugin with:

`npm install gatsby-transformer-remark`

and configured it with:

`gist:antonholmberg/374a21ede41ce5eb34b76dbfbbba22ac`

Now when I run this graphql query:

`gist:antonholmberg/b8097cb08a5ec4663a7b48f92ffc7032`

I get back:

`gist:antonholmberg/81655fe69cf947ab2d2ada57b62a728f`

### Generating Pages From Sources
