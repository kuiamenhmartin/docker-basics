# ARG variable is the only instruction that can be specified before the FROM instruction
ARG BASE_IMAGE=node:20.18-alpine3.21

# The FROM instruction is used to specify the base image
FROM ${BASE_IMAGE}

# Specify the working directory for the new user
# All succeeding instructions will be executed in this directory
# It's a good practice to set the working directory to the root of the application
WORKDIR /app

# Optional LABLE instruction is used to specify the metadata of the image
LABEL maintainer="Docker Maintainers <kuiamenh>"

# The COPY instruction is used to copy files from the host machine to the container (host machine -> container)
# Copy package.json and package-lock.json
COPY package*.json .

# The RUN instruction is used to execute commands in the container when the container is being started
# Install project dependencies before starting the container
RUN npm install

# Copy the rest of the application files (host machine -> container)
COPY . .

# The EXPOSE instruction is used to specify the port on which the container will listen for incoming connections
EXPOSE 3000

# The CMD instruction is used to specify the command that will run when the container starts
CMD ["sh", "-c", "npm run start"]
