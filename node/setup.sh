#!/bin/bash
# The script assume you have npm and node ofcourse installed.
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $SCRIPT_DIR
npm install
cp .env.example .env
echo "Remplace the values of the vars in the .env file."
echo "Then Run the proyecto with npm start command"
