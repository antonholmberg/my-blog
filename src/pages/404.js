import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import RoundedImage from '../components/RoundedImage';

const fadeTime = 400;
const showTime = 5000;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: ${props => props.opacity};
  transition: opacity ease ${fadeTime}ms;
`;

const NotFoundPage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1.0);

  const {
    allFile: { edges },
  } = data;

  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity(0.0);
      setTimeout(() => {
        setImageOpacity(1.0);
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * edges.length);
        } while (randomIndex === imageIndex);

        setImageIndex(randomIndex);
      }, fadeTime);
    }, showTime);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Layout>
      <h2>NOT FOUND</h2>
      <p>
        You just hit a route that doesn&#39;t exist... In the meantime you can
        enjoy some random images of my cats!
      </p>
      <ImageContainer opacity={imageOpacity}>
        <RoundedImage
          fadeIn={false}
          fixed={edges[imageIndex].node.childImageSharp.fixed}
        />
      </ImageContainer>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "cats" } }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

export default NotFoundPage;
