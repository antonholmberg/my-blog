import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import ContentWrapper from './ContentWrapper';

import './Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <Helmet>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />
      <meta name="theme-color" content="#b366ff" />
    </Helmet>
    <Header siteTitle="Anton Holmberg" />
    <main>
      <ContentWrapper>{children}</ContentWrapper>
    </main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Layout.defaultProps = {
  children: [],
};

export default Layout;
