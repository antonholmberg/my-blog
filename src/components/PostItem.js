import React from 'react';
import PropTypes from 'prop-types';
import StyledLink from './StyledLink';

import './PostItem.css';

const PostItem = ({ title, preview, path }) => (
  <article className="post-item">
    <header>
      <h3 className="post-item__title">
        <StyledLink to={path}>{title}</StyledLink>
      </h3>
    </header>
    <p>{preview}</p>
  </article>
);

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default PostItem;
