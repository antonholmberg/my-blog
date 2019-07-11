import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/Layout';
import RoundedImage from '../components/RoundedImage';

import './404.css';

const fadeTime = 400;
const showTime = 5000;

const NotFoundPage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0.0);

  const {
    allFile: { edges },
  } = data;

  useEffect(() => {
    let timeout = null;

    if (imageOpacity === 0) {
      let randomIndex = 0;
      do {
        randomIndex = Math.floor(Math.random() * edges.length);
      } while (randomIndex === imageIndex);
      timeout = setTimeout(() => {
        setImageIndex(randomIndex);
      }, fadeTime);
    } else {
      timeout = setTimeout(() => setImageOpacity(0.0), showTime);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [imageOpacity]);

  useEffect(() => {
    let timeout = null;
    if (imageOpacity === 0.0) {
      timeout = setTimeout(() => setImageOpacity(1.0), fadeTime);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [imageIndex]);

  const imageContainerClassName = classNames('fourOFour__image-wrapper', {
    'fourOFour__image-wrapper--hidden': imageOpacity === 0.0,
  });

  return (
    <Layout>
      <Helmet>
        <title>Page could not be found</title>
        <meta
          name="Description"
          content="The page you were looking for could not be found but please have a look at some cute cats"
        />
      </Helmet>
      <h2>NOT FOUND</h2>
      <p>
        You just hit a route that doesn&#39;t exist... In the meantime you can
        enjoy some random images of my cats!
      </p>
      <div className={imageContainerClassName}>
        <RoundedImage
          alt="A cat to keep you occupied"
          fadeIn={false}
          fixed={edges[imageIndex].node.childImageSharp.fixed}
        />
      </div>
    </Layout>
  );
};

NotFoundPage.propTypes = {
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
