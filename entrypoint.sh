#! /bin/bash

set -e

echo -e "Current NODE_ENV is $NODE_ENV \n******\n"

if [[ $NODE_ENV = 'development' ]]; then
  exec npm start
elif [[ $NODE_ENV = 'production' ]]; then
  exec npm install -g http-server && npm run build && cd /app/build && hs -p 3000
else
  echo -e "Not valid ENV $NODE_ENV\n*******\nAvailable envs [development, production]"
fi
