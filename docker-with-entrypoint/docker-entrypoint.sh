#!/bin/sh
set -e  # Exit immediately if a command fails

echo "Starting container with custom entrypoint..."
echo "You can run your initialization script here such as migration, setting up environment variables, etc."

# # Run the main command
exec "$@"
