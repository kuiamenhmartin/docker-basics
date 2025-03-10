# Docker Network Isolation Demo

This demo demonstrates that containers on different Docker networks cannot communicate with each other. We will use the **default bridge network** in Docker to isolate services.

## Prerequisites
- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

## Running Docker Services in Isolation

### **Step 1: Run MySQL Service**
1. Open a terminal and navigate to the MySQL directory:
   ```sh
   cd /docker-mysql
   ```
2. Start the MySQL container:
   ```sh
   docker-compose up -d
   ```
3. Verify that the container is running:
   ```sh
   docker ps
   ```
4. Confirm that the Docker network `mysql` is created:
   ```sh
   docker network ls
   ```

### **Step 2: Run phpMyAdmin Service**
1. Open a terminal and navigate to the phpMyAdmin directory:
   ```sh
   cd /docker-phpmyadmin
   ```
2. Start the phpMyAdmin container:
   ```sh
   docker-compose up -d
   ```
3. Verify that the container is running:
   ```sh
   docker ps
   ```
4. Confirm that the Docker network `phpmyadmin` is created:
   ```sh
   docker network ls
   ```

## Testing Network Isolation

### **Step 3: Verify MySQL Cannot Ping phpMyAdmin**
1. Install `ping` inside the MySQL container (base image: Oracle Linux 8/RHEL-based):
   ```sh
   docker exec -it mysql microdnf install -y iputils
   ```
2. Try to ping phpMyAdmin from within the MySQL container:
   ```sh
   docker exec -it mysql ping phpmyadmin
   ```
   **Expected result:** The MySQL container should not be able to reach phpMyAdmin.

### **Step 4: Verify phpMyAdmin Cannot Ping MySQL**
1. Install `ping` inside the phpMyAdmin container (base image: Debian GNU/Linux 12 (bookworm):
   ```sh
   docker exec -it phpmyadmin sh -c "apt-get update && apt-get install -y iputils-ping"
   ```
2. Try to ping MySQL from within the phpMyAdmin container:
   ```sh
   docker exec -it phpmyadmin ping mysql
   ```
   **Expected result:** The phpMyAdmin container should not be able to reach MySQL.

## Notes
- Since different Docker images use different base OS distributions, installing packages varies. To check which OS is used in a container, run:
  ```sh
  docker exec -it <container_name> sh -c "cat /etc/os-release"
  ```

## Conclusion
This experiment confirms that containers attached to different Docker networks cannot communicate with each other. If network communication is required, you need to explicitly connect both containers to a shared network.

## Troubleshooting
- If the containers cannot start, check the logs:
  ```sh
  docker-compose logs
  ```
- To clean up all running services:
  ```sh
  docker-compose down
  ```

## References
- [Docker Networking](https://docs.docker.com/network/)
- [Docker Compose](https://docs.docker.com/compose/)
