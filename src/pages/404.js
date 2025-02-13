import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import classNames from 'classnames';

import Layout from '../components/Layout';


const NotFoundPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page could not be found</title>
        <meta
          name="Description"
          content="The page you were looking for could not be found"
        />
      </Helmet>
      <h2>NOT FOUND</h2>
      <p>
        You just hit a route that doesn&#39;t exist... In the meantime you can
        enjoy some random images of my cats!
      </p>
    </Layout>
  );
};

export default NotFoundPage;
