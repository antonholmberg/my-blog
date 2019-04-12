import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './StyledLink.css';

export default function StyledLink({ children, inverse, ...props }) {
  const className = classNames('styled-link', {
    'styled-link--inverse': inverse,
  });
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}

StyledLink.propTypes = {
  children: PropTypes.element,
  inverse: PropTypes.bool,
};

StyledLink.defaultProps = {
  children: [],
  inverse: false,
};
