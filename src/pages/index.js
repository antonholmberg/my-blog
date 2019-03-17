import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PostItem from '../components/PostItem';
import RoundedImage from '../components/RoundedImage';

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (min-width: 36em) {
    flex-direction: row;
    align-items: center;
    text-align: start;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  margin-right: 1rem;
`;

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
    <Introduction>
      <ImageContainer>
        <RoundedImage fixed={profilePicture.childImageSharp.fixed} />
      </ImageContainer>
      <Bio>
        <h4>I am Anton Holmberg</h4>
        <p>
          I am a software developer mostly into Javascript and Android
          development. I also know my way around some python script-fu and in my
          spare time I play around with Rust.
        </p>
      </Bio>
    </Introduction>
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
