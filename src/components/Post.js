import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from './layout';

const PostTitle = styled.h2``;

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <div
        className="blog-post-content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  );
};

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Post;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
