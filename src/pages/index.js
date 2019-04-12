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
    </Helmet>
    <Introduction profilePicture={profilePicture} />
    <section>
      {edges.map(edge => (
        <PostItem
          title={edge.node.frontmatter.title}
          path={edge.node.frontmatter.path}
          preview={edge.node.excerpt}
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
          excerpt(pruneLength: 200)
          frontmatter {
            title
            path
          }
        }
      }
    }
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default IndexPage;
