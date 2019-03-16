import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header';

const Content = styled.div`
  margin: 0 auto;
  padding: 1rem;
  max-width: 960px;
`;

const Layout = ({ children }) => (
  <div>
    <Header siteTitle="Anton Holmberg" />
    <Content>{children}</Content>
  </div>
);

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Layout.defaultProps = {
  children: [],
};

export default Layout;
