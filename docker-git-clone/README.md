# Docker: Clone Private Repository Using GitHub Username and Token

This guide demonstrates how to clone a private GitHub repository within a Docker container using a GitHub username and token securely.

## Steps to Run

1. **Create a file** named `.githubtoken` (or any preferred name).
2. **Add your GitHub username and token** inside the `.githubtoken` file in the following format:
   ```sh
   username:your_github_token
   ```
3. **Build the Docker image** using BuildKit to securely pass secrets without embedding them in the final image:
   ```sh
   DOCKER_BUILDKIT=1 docker build --secret id=github_credentials,src=./.githubtoken -t clone-repo:v1 .
   ```
4. **Run the container**:
   ```sh
   docker run -d --rm --name c1 clone-repo:v1
   ```

## Notes
- **DOCKER_BUILDKIT=1** enables BuildKit, allowing the use of secrets securely during the build process.
- The `.githubtoken` file is never stored inside the final image, ensuring credentials remain safe.
- You can customize the repository URL inside your Dockerfile to match your private repository.

## References
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Docker BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/)
