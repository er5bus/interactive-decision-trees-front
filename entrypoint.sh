#! /bin/bash

set -e

echo -e "Current ENV is $APP_ENV \n******\n"

if [[ $APP_ENV = 'dev' ]]; then
  exec npm start
elif [[ $APP_ENV = 'test' ]]; then
  exec npm run test
elif [[ $APP_ENV = 'prod' ]]; then
  exec npm run build
else
  echo -e "Not valid ENV $APP_ENV\n*******\nAvailable envs [dev, test, prod]"
fi
