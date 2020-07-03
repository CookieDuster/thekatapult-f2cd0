#!/usr/bin/env bash

set -e
set -o pipefail
set -v

curl -s -X POST https://api.stackbit.com/project/5eff2cd0b3f08f001b1bd043/webhook/build/pull > /dev/null
npx @stackbit/stackbit-pull --stackbit-pull-api-url=https://api.stackbit.com/pull/5eff2cd0b3f08f001b1bd043
curl -s -X POST https://api.stackbit.com/project/5eff2cd0b3f08f001b1bd043/webhook/build/ssgbuild > /dev/null
gatsby build
curl -s -X POST https://api.stackbit.com/project/5eff2cd0b3f08f001b1bd043/webhook/build/publish > /dev/null
