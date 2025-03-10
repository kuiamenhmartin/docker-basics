# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Install necessary packages
RUN apt-get update && apt-get install -y git redis-server

# Define secret mount and clone repository
# Make sure to specify the same mount point you used to run the build command
RUN --mount=type=secret,id=github_credentials \
    GITHUB_USERNAME="$(sed -n '1p' /run/secrets/github_credentials)" && \
    GITHUB_TOKEN="$(sed -n '2p' /run/secrets/github_credentials)" && \
    # Change the url of a private repository of your own
    git clone https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/ota-api.git .

# Install dependencies
RUN npm install

# Expose the port the app runs on when the container is running
EXPOSE 3000

# Start redis-server and the app
CMD ["sh", "-c", "service redis-server start && npm start"]
