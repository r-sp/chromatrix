#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "prod" || "$VERCEL_GIT_COMMIT_REF" == "dev" ]] ; then
  exit 1;
else
  exit 0;
fi