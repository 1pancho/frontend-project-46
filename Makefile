lint:
	npx eslint .

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	npm test

install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npm test --test-reporter=spec

publish:
	npm publish