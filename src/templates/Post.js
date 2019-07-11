import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="Description" content={post.frontmatter.description} />
      </Helmet>
      <article>
        <header>
          <h2>{post.frontmatter.title}</h2>
        </header>
        <div
          className="blog-post-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
      }
    }
  }
`;
