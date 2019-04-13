import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './Introduction.css';

export default function Introduction({ profilePicture }) {
  return (
    <section className="introduction">
      <div className="introduction__image-wrapper">
        <Img
          className="introduction__image"
          fixed={profilePicture.childImageSharp.fixed}
        />
      </div>
      <article>
        <header>
          <h4 className="introduction__title">I am Anton Holmberg</h4>
        </header>
        <p>
          I am a software developer mostly into Javascript and Android
          development. I also know my way around some python script-fu and in my
          spare time I play around with Rust.
        </p>
      </article>
    </section>
  );
}

Introduction.propTypes = {
  profilePicture: PropTypes.any.isRequired,
};
