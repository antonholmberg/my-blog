import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StyledLink from './StyledLink';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-top: 0.1rem solid #e6e6e6;
  :first-child {
    border-top: none;
  }
`;

const PostTitle = styled.h3`
  padding: 0px;
`;

const PostPreview = styled.p`
  text-overflow: ellipsis;
`;

const PostItem = ({ title, preview, path }) => (
  <Root>
    <StyledLink to={path}>
      <PostTitle>{title}</PostTitle>
    </StyledLink>
    <PostPreview>{preview}</PostPreview>
  </Root>
);

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default PostItem;
