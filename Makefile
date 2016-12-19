FILE=VERSION
VERSION=`cat $(FILE)`

.PHONY: build geonode package release

build:
	npm run dist

geonode: build
	npm run geonode:deploy

package: geonode
	python setup.py sdist bdist_wheel

release: package
	twine upload dist/django-geonode-client-$(VERSION).tar.gz
