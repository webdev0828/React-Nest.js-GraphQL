#!/usr/bin/env bash

BASE_DIR=`pwd`
PACKAGE_NAMES=('api' 'core' 'form' 'grid' 'layout' 'next-apollo' 'utils' 'system' 'component' 'style')


for i in "${PACKAGE_NAMES[@]}"
do
  PACKAGE_DIR="packages/${i}"

#  Go to each package directory
  cd "${BASE_DIR}/${PACKAGE_DIR}"
  $@
#  echo `pwd`
done

