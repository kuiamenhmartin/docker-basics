# Use the official Node.js image as the base image
# Normally you would use the lightweight Node.js image version for most applications
FROM node:20.18-alpine3.21 as build

# Add arguments for GitHub username and token
ARG GITHUB_USERNAME
ARG GITHUB_TOKEN

# Echo the arguments to verify they are passed correctly
# Technically passing sensitive parameters is not a good idea for security purposes, but for the sake of this example, we will echo them
# RUN echo "Username: $GITHUB_USERNAME"
# RUN echo "Token: $GITHUB_TOKEN"

# Check if the arguments have values and exit if they are empty
RUN if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then echo "GITHUB_USERNAME and/or GITHUB_TOKEN is not set"; exit 1; fi

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages using apk
# apt is the package manager used for Debian/Ubuntu based images, while apk is used for Alpine Linux images, which is a lightweight Linux distribution
# Update the package repository and install git
RUN apk update && apk add --no-cache git

# Clone the Git repository using the provided credentials
RUN git clone https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/kuiamenhmartin/ota-api.git .

# Install dependencies and build the application
RUN npm install && npm run build


# We are using the alphine image as the base image for the final stage
# The final stage is used to create the final image that will be used to run the application
# Without the alias 'final' we will reference the final image a an index like an array --from=index
FROM node:20.18-alpine3.21 as final

WORKDIR /app

# Copy the built application files and node_modules from the build stage
# This is done to ensure that only the necessary files are copied to the final image
# This helps to reduce the size of the final image
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules