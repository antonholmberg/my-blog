import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import theme from '../theme';

const HeaderBackground = styled.header`
  background: ${theme.colors.accentColor};
  margin-bottom: 1.45rem;
`;

const Header = ({ siteTitle }) => (
  <HeaderBackground>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem 1.0875rem',
      }}
    >
      <StyledLink textColor="white" to="/">
        <h1 style={{ margin: 0 }}>{siteTitle}</h1>
      </StyledLink>
    </div>
  </HeaderBackground>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
