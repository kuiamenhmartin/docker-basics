# Use the official Node.js image as a base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
# CMD ["node", "app.js"]

# Run the application using multiple commands through the shell
CMD ["sh", "-c", "ls -la && node index.js"]