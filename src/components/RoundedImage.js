import React from 'react';
import Img from 'gatsby-image';

import './RoundedImage.css';

export default function RoundedImage({ ...props }) {
  return <Img {...props} className="rounded-image" />;
}
