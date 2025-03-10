# Use the official Node.js image as the base image
FROM node:latest as build

# Add arguments for GitHub username and token
ARG GITHUB_USERNAME
ARG GITHUB_TOKEN

# Check if the arguments have values and exit if they are empty
RUN if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then echo "GITHUB_USERNAME and/or GITHUB_TOKEN is not set"; exit 1; fi

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages using apk
RUN apt-get update && apt-get install --no-install-recommends -y git

# Clone the Git repository using the provided credentials
RUN git clone https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/kuiamenhmartin/ota-api.git .

# Install dependencies
RUN npm install && npm run build

# Verify that the dist directory is created
RUN ls -la


FROM node:20.18-alpine3.21 as final

WORKDIR /app

# Install necessary packages using apk
RUN apk update && apk add --no-cache redis

# Copy the built application files and node_modules from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Expose the port the app runs on
EXPOSE 4000

# Set the entry point for the application
CMD ["sh", "-c", "redis-server --daemonize yes && node ./dist/src/index.js"]
