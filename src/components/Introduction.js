import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';

import './Introduction.css';

export default function Introduction({ profilePicture }) {
  return (
    <article className="introduction">
      <div className="introduction__image-wrapper">
        <StaticImage
          className="introduction__image"
          layout="constrained"
          src="../../images/profile.png"
        />
      </div>
      <div>
        <header>
          <h4 className="introduction__title">I am Anton Holmberg</h4>
        </header>
        <p>
          I am a software developer mostly into Javascript and Android
          development. I also know my way around some python script-fu and in my
          spare time I play around with Rust.
        </p>
      </div>
    </article>
  );
}

Introduction.propTypes = {
  profilePicture: PropTypes.any.isRequired,
};
