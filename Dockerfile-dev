FROM node:12-alpine3.11

LABEL MAINTAINER="Rami sfari <rami2sfari@gmail.com>"

# Copy project & set working directory
COPY . /app/
WORKDIR /app

# install app dependencies
RUN ["yarn"]

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

# start the container
CMD ["yarn", "start"]
