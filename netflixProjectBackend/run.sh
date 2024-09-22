#!/bin/sh

cd /eng/docker && docker-compose up -d && cd /netflixProjectBackend && npm i -f && npm run dev
