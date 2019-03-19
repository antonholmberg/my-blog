import React from 'react';
import styled from 'styled-components';
import CenteredContent from './CenteredContent';

const Root = styled.div`
  background: black;
  color: white;
  min-height: 6rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  a {
    font-size: 0.8rem;
    color: white;
    text-decoration: none;
  }
`;

const Content = styled(CenteredContent)`
  display: flex;
  flex-direction: column;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  align-self: flex-start;
`;

const SocialMediaIcon = styled.i`
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const Footer = () => (
  <Root>
    <Content>
      <LinkContainer>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/antonholmberg"
        >
          <SocialMediaIcon className="fab fa-github" />
          antonholmberg
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://twitter.com/540GrunkSpin"
        >
          <SocialMediaIcon className="fab fa-twitter-square" />
          @540GrunkSpin
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/anton-holmberg-9738a281/"
        >
          <SocialMediaIcon className="fab fa-linkedin" />
          Anton Holmberg
        </a>
      </LinkContainer>
    </Content>
  </Root>
);

export default Footer;
