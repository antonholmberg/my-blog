import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import PostItem from '../components/PostItem';
import Introduction from '../components/Introduction';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
    file: profilePicture,
  },
}) => (
  <Layout>
    <Helmet>
      <title>Anton Holmberg</title>
      <meta
        name="Description"
        content="The personal blog for me, Anton Holmberg. Mainly programming stuff, mostly JS"
      />
    </Helmet>
    <Introduction />
    <section>
      {edges.map((edge) => (
        <PostItem
          title={edge.node.frontmatter.title}
          path={edge.node.frontmatter.path}
          preview={edge.node.frontmatter.description}
        />
      ))}
    </section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          html
          frontmatter {
            description
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;
