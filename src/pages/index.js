import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import PostItem from '../components/PostItem';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Helmet>
      <title>Anton Holmberg</title>
    </Helmet>
    {edges.map(edge => (
      <PostItem
        title={edge.node.frontmatter.title}
        path={edge.node.frontmatter.path}
        preview={edge.node.excerpt}
      />
    ))}
  </Layout>
);

IndexPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          html
          excerpt(pruneLength: 200)
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;
