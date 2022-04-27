FROM node:12-stretch

# set current user
USER node

RUN mkdir /home/node/src
WORKDIR /home/node/src

# copy everything from host into the image ( from dot to src )
COPY --chown=node:node . .

# Install everything in package-lock.json
RUN ls
RUN npm ci

# use add if you need to get files over the network or unzipped
# ADD --chown=node:node index.js index.js

CMD ["node", "app/index.js", "console.log(\"dave is kew\")"]
