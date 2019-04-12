import React from 'react';
import PropTypes from 'prop-types';
import StyledLink from './StyledLink';
import ContentWrapper from './ContentWrapper';

import './Header.css';

const Header = ({ siteTitle }) => (
  <header className="header">
    <ContentWrapper>
      <StyledLink inverse to="/">
        <h1 style={{ margin: 0 }}>{siteTitle}</h1>
      </StyledLink>
    </ContentWrapper>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
