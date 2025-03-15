#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "next" ]] ; then
  exit 1;
else
  exit 0;
fi