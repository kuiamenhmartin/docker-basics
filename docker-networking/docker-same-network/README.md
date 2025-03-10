# Docker Same Network Communication Demo

This demo demonstrates that service containers running on the same Docker network can communicate with each other.

## Steps to Run

1. Open a terminal and navigate to the project folder:
   ```sh
   cd /docker-same-network
   ```
2. Run Docker Compose to create and start the service containers:
   ```sh
   docker-compose up -d
   ```
3. Verify that the service containers are running on the same network (`phpmyadmin-mysql`):
   ```sh
   docker network ls
   ```
4. (Optional) To view which containers belong to the `phpmyadmin-mysql` network, run:
   ```sh
   docker network inspect phpmyadmin-mysql
   ```

## Testing Network Connectivity

### **Step 1: Verify phpMyAdmin Can Ping MySQL**
1. Install `ping` inside the phpMyAdmin container (base image: Oracle Linux 8 / RHEL-based):
   ```sh
   docker exec -it phpmyadmin sh -c "apt-get update && apt-get install -y iputils-ping"
   ```
2. Try to ping MySQL from within the phpMyAdmin container:
   ```sh
   docker exec -it phpmyadmin ping mysql
   ```
   **Expected result:** The phpMyAdmin container should be able to reach MySQL.

### **Step 2: Verify MySQL Can Ping phpMyAdmin**
1. Install `ping` inside the MySQL container (base image: Debian GNU/Linux 12 - Bookworm):
   ```sh
   docker exec -it mysql sh -c "apt-get update && apt-get install -y iputils-ping"
   ```
2. Try to ping phpMyAdmin from within the MySQL container:
   ```sh
   docker exec -it mysql ping phpmyadmin
   ```
   **Expected result:** The MySQL container should be able to reach phpMyAdmin.

## Notes
- Since different Docker images use different base OS distributions, installing packages varies. To check which OS is used in a container, run:
  ```sh
  docker exec -it <container_name> sh -c "cat /etc/os-release"
  ```

## References
- [Docker Networking](https://docs.docker.com/network/)
- [Docker Compose](https://docs.docker.com/compose/)
