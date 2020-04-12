FROM node:lts

LABEL MAINTAINER="Rami sfari <rami2sfari@gmail.com>"

# Copy project & set working directory
COPY . /app/
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN ["npm", "install", "--silence"]

EXPOSE 3000

# Runtime configuration
ENTRYPOINT ["/app/entrypoint.sh"]
