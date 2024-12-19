# Start your image with a node base image
FROM node:22-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY types.ts ./
COPY package*.json ./
COPY tsconfig.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install
RUN npm run build

ENV PORT=9000

EXPOSE 9000

# Start the app using serve command
CMD [ "node", "./build/src/index.js" ]