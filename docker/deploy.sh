#!/bin/bash

set -e

# Change to the script's directory to ensure relative paths work
cd "$(dirname "$0")"

# Environment parameter
if [ -z "$1" ]; then
  echo -e "\033[0;31mError: Environment not specified. Usage: ./deploy.sh [development|staging|production]\033[0m"
  exit 1
fi

ENV=$1

# Configuration based on environment
case "$ENV" in
  development)
    SERVER_USER="rakesh.tembhurne"
    SERVER_HOST="ugpDevOne"
    SERVER_PATH="/home/rakesh.tembhurne/poc-fos"
    IMAGE_NAME="poc-fos-development"
    COMPOSE_FILE="development/compose.yaml"
    ENV_FILE="../.env.development.sample"
    ;;
  staging)
    SERVER_USER="your_staging_user"
    SERVER_HOST="your_staging_host"
    SERVER_PATH="/path/to/your/staging/app"
    IMAGE_NAME="poc-fos-staging"
    COMPOSE_FILE="staging/compose.yaml"
    ENV_FILE="../.env.staging.sample"
    ;;
  production)
    SERVER_USER="your_production_user"
    SERVER_HOST="your_production_host"
    SERVER_PATH="/path/to/your/production/app"
    IMAGE_NAME="poc-fos-production"
    COMPOSE_FILE="production/compose.yaml"
    ENV_FILE="../.env.production.sample"
    ;;
  *)
    echo -e "\033[0;31mError: Invalid environment '$ENV'. Use [development|staging|production]\033[0m"
    exit 1
    ;;
esac

TAR_FILE="/tmp/${IMAGE_NAME}.tar.gz"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}===================================${NC}"
echo -e "${GREEN}POC-FOS Deployment Script${NC}"
echo -e "${GREEN}Environment: ${ENV}${NC}"
echo -e "${GREEN}===================================${NC}"

# Get password from pass, taking only the first line to avoid extra newlines
echo -e "${YELLOW}Retrieving password...${NC}"
export SSHPASS=$(pass pinnacle/ugp/devUgp/ldapPassword | head -n 1)

if [ -z "$SSHPASS" ]; then
  echo -e "${RED}Error: Failed to retrieve password from pass${NC}"
  exit 1
fi

echo -e "${GREEN}Step 1: Checking if Docker image exists locally${NC}"
if docker image inspect ${IMAGE_NAME} >/dev/null 2>&1; then
  echo -e "${YELLOW}Image ${IMAGE_NAME} already exists locally, skipping build${NC}"
  read -p "Do you want to rebuild the image? (y/N): " rebuild
  if [[ $rebuild =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Rebuilding Docker image locally${NC}"
    docker compose -f ${COMPOSE_FILE} build
  fi
else
  echo -e "${GREEN}Building Docker image locally${NC}"
  docker compose -f ${COMPOSE_FILE} build
fi

echo -e "${GREEN}Step 2: Checking if tar file exists${NC}"
if [ -f "${TAR_FILE}" ]; then
  echo -e "${YELLOW}Tar file already exists, skipping save${NC}"
  read -p "Do you want to recreate the tar file? (y/N): " recreate
  if [[ $recreate =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Saving Docker image to tar file${NC}"
    docker save ${IMAGE_NAME} | gzip >${TAR_FILE}
  fi
else
  echo -e "${GREEN}Saving Docker image to tar file${NC}"
  docker save ${IMAGE_NAME} | gzip >${TAR_FILE}
fi

echo -e "${GREEN}Step 3: Creating remote directory if not exists${NC}"
sshpass -e ssh "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${SERVER_PATH}"

echo -e "${GREEN}Step 4: Copying Docker image tar to server${NC}"
sshpass -e scp ${TAR_FILE} "${SERVER_USER}@${SERVER_HOST}:${TAR_FILE}"

echo -e "${GREEN}Step 5: Copying docker-compose file to server${NC}"
sshpass -e scp ${COMPOSE_FILE} "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/compose.yaml"

echo -e "${GREEN}Step 6: Copying environment file to server${NC}"
sshpass -e scp ${ENV_FILE} "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/.env"

echo -e "${GREEN}Step 7: Checking if image exists on server${NC}"
IMAGE_EXISTS=$(sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
docker images --format '{{.Repository}}' 2>/dev/null | grep -q "^${IMAGE_NAME}$" && echo 'yes' || echo 'no'
ENDSSH
)

IMAGE_EXISTS=$(echo "$IMAGE_EXISTS" | grep -o -e "yes" -o -e "no" | tail -n 1)

if [ "$IMAGE_EXISTS" = "yes" ]; then
  echo -e "${YELLOW}Image ${IMAGE_NAME} already exists on server, skipping load${NC}"
else
  echo -e "${GREEN}Loading Docker image on server${NC}"
  sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
docker load < ${TAR_FILE}
ENDSSH
fi

echo -e "${GREEN}Step 8: Stopping existing containers${NC}"
sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
cd ${SERVER_PATH} && docker compose -f compose.yaml down 2>&1 || true
ENDSSH

echo -e "${GREEN}Step 9: Starting new containers${NC}"
sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
cd ${SERVER_PATH} && export HOST_PORT=80 && docker compose -f compose.yaml up -d
ENDSSH

echo -e "${GREEN}Step 10: Checking container status${NC}"
sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
cd ${SERVER_PATH} && docker compose -f compose.yaml ps
ENDSSH

echo -e "${GREEN}Step 11: Showing container logs (last 20 lines)${NC}"
sshpass -e ssh -T "${SERVER_USER}@${SERVER_HOST}" << ENDSSH
cd ${SERVER_PATH} && docker compose -f compose.yaml logs --tail=20
ENDSSH

echo -e "${GREEN}===================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Application should be running on port 80${NC}"
echo -e "${GREEN}===================================${NC}"
