import os
from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'VERSION')) as version_file:
        version = version_file.read().strip()

setup(
    name='django-geonode-client',
    version=version,
    author='Mila Frerichs',
    author_email='mila.frerichs@gmail.com',
    url='https://github.com/GeoNode/geonode-client',
    description="Use GeoNode client in your django projects",
    long_description=open(os.path.join(here, 'README.md')).read(),
    license='LGPL, see LICENSE file.',
    install_requires=[],
    packages=find_packages(),
    include_package_data = True,
    zip_safe = False,
    classifiers  = [],
)
