FROM node:12-stretch

# set current user
USER node

RUN mkdir /home/node/src
WORKDIR /home/node/src

# It is also possible to "cache" packages in this way when rebuilding:
# COPY --chown=node:node package-lock.json package.json ./

# copy everything from host into the image ( from dot to src )
COPY --chown=node:node . .

# Install everything in package-lock.json
# This will run every time this is built, it is not "cached"
RUN ls
RUN npm ci

# use add if you need to get files over the network or unzipped
# ADD --chown=node:node index.js index.js

# exposes port 3000, but requires extra steps to connect
# EXPOSE 3000

CMD ["node", "app/index.js", "console.log(\"dave is kew\")"]
