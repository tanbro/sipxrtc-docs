#!/usr/bin/env bash

# Build for serverless deploy, to COS static website

set -e

rm -fr ./dist/*
mkdir -p ./dist/docs
python3 -m mkdocs build -d ./dist/docs
