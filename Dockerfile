FROM node:18.14.2-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

RUN npm i --save-dev @types/node

# Copy the rest of the code
 COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev"]