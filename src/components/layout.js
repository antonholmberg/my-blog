import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import CenteredContent from './CenteredContent';

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  ::after {
    display: block;
    content: '';
    height: 6rem;
  }
`;

const Layout = ({ children }) => (
  <Root>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />
    </Helmet>
    <Header siteTitle="Anton Holmberg" />
    <CenteredContent>{children}</CenteredContent>
    <Footer />
  </Root>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Layout.defaultProps = {
  children: [],
};

export default Layout;
