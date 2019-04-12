import React from 'react';
import PropTypes from 'prop-types';
import StyledLink from './StyledLink';

import './PostItem.css';

const PostItem = ({ title, preview, path }) => (
  <article className="post-item">
    <StyledLink to={path}>
      <header>
        <h3 className="post-item__title">{title}</h3>
      </header>
    </StyledLink>
    <p>{preview}</p>
  </article>
);

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default PostItem;
