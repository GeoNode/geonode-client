#!/bin/bash

if ([ $TRAVIS_BRANCH == "master" ] && [ $TRAVIS_PULL_REQUEST == "false" ])
then
  npm run deploy
  echo "Published sucessfully."
else
  echo "Build successful, but not publishing!"
fi
