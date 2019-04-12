import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ContentWrapper.css';

export default function ContentWrapper({ children, className }) {
  const classes = classNames('content-wrapper', className);
  return <div className={classes}>{children}</div>;
}

ContentWrapper.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

ContentWrapper.defaultProps = {
  children: [],
  className: undefined,
};
