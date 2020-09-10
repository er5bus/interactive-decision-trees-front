FROM node:12-alpine3.11

LABEL MAINTAINER="Rami Sfari <rami2sfari@gmail.com>"

# install dependencies & set working directory
COPY ./package.json /app/
WORKDIR /app
RUN ["yarn"]

# Copy project
COPY . /app/

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# Create a group and user
RUN addgroup -S www-data && adduser -S www-data -G www-data

# Add Permission to the user to change the env file
RUN chown www-data:www-data ./public -R

# Tell docker that all future commands should run as the appuser user
USER www-data

# start the container
CMD ./env.sh > ./public/env.js && yarn start
