#!/usr/bin/env bash
# Run PHP unit tests via Docker (no local PHP install needed).
docker run --rm \
  -v "$(cd "$(dirname "$0")/../.." && pwd):/app" \
  -w /app \
  php:8.2-cli \
  bash -c 'curl -sSL https://phar.phpunit.de/phpunit-10.phar -o /tmp/phpunit.phar && php /tmp/phpunit.phar --configuration tests/php/phpunit.xml --testdox'
