#! /bin/bash

set -e;

MY_DIR=$(dirname "$0");
XML_DIR="$MY_DIR/../../source/";

php "$MY_DIR/build.php" "$XML_DIR/packager.xml";