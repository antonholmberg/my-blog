#!/usr/bin/env node
/* eslint-disable no-console */

const ghpages = require('gh-pages');

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: `https://${
      process.env.GH_PAGES_KEY
    }@github.com/antonholmberg/antonholmberg.github.io.git`,
    silent: true,
  },
  err => {
    if (err) console.error(`Deployment failed ${err}`);
    else console.info('Deploy Complete!');
  },
);
/* eslint-enable no-console */
