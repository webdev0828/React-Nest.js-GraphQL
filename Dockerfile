# Use image
FROM node:10

# Add code from host to VM
ADD . /app

# Set VM working dir
WORKDIR /app

# Allow localhost access
EXPOSE 3000

# Set yarn version
ENV YARN_VERSION 1.16.0

# Run commands
RUN apt-get update\
 && apt-get install -y --no-install-recommends apt-utils build-essential libkrb5-dev
RUN yarn global add lerna npx
RUN lerna bootstrap && yarn build

# Entry command
CMD [ "yarn", "start" ]

