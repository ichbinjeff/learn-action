# Use the official Node.js 18 image from Docker Hub as the base image
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /site

COPY newco/.env.local /site/.env.local
COPY newco/ .

# Install the dependencies defined in package.json
RUN npm install

# Set the environment variable NODE_ENV to development (or production as needed)
ENV NODE_ENV development

# The command to run your application, adjust as necessary
CMD ["npm", "run", "dev"]
