import React from 'react';
import ContentWrapper from './ContentWrapper';

import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <ContentWrapper className="column">
      <section className="footer__links">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/antonholmberg"
        >
          <figure className="fab fa-github footer__social-media-icon" />
          <figcaption className="footer__social-media-text">
            antonholmberg
          </figcaption>
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://twitter.com/540GrunkSpin"
        >
          <figure className="fab fa-twitter-square footer__social-media-icon" />
          <figcaption className="footer__social-media-text">
            540GrunkSpin
          </figcaption>
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/anton-holmberg-9738a281/"
        >
          <figure className="fab fa-linkedin footer__social-media-icon" />
          <figcaption className="footer__social-media-text">
            Anton Holmberg.
          </figcaption>
        </a>
      </section>
    </ContentWrapper>
  </footer>
);

export default Footer;
