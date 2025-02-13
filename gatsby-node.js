const path = require('path');

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const blogPostTemplate = path.resolve('src/templates/Post.js');

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          path: node.frontmatter.path,
        }, // additional data can be passed via context
      });
    });

    return Promise.resolve();
  });
};
