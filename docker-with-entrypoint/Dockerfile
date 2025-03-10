ARG BASE_IMAGE=balenalib/amd64-alpine-node:latest

FROM ${BASE_IMAGE}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

# Setting entry point script
# This will run first when the containe is started
# If the entrypoint script has `exec "$@"` at the end, the CMD command below will be executed
# Otherwise, the CMD command will be ignored
ENTRYPOINT ["docker-entrypoint.sh"]

# This command will be executed if the entrypoint script does not have `exec "$@"` at the end
CMD ["sh", "-c", "node index.js"]
