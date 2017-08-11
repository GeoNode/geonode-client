import os
from setuptools import setup, find_packages
import subprocess

here = os.path.abspath(os.path.dirname(__file__))


def get_version(version=None):
    "Returns a version number with commit id if the git repo is present"
    with open(os.path.join(here, 'VERSION')) as version_file:
            version = version_file.read().strip()
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        _commit = subprocess.Popen(
            'git rev-parse --short HEAD',
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
            cwd=repo_dir,
            universal_newlines=True
        )
        commit = _commit.communicate()[0].partition('\n')[0]
    except:
        commit = None
    if commit:
        version = "{}.{}".format(version, commit)
    return version

setup(
    name='django-geonode-client',
    version=get_version(),
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
