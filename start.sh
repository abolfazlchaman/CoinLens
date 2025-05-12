#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required tools
if ! command_exists docker; then
  echo "Error: Docker is not installed"
  exit 1
fi

if ! command_exists docker-compose; then
  echo "Error: Docker Compose is not installed"
  exit 1
fi

# Function to start the development environment
start_dev() {
  echo "Starting development environment..."
  docker-compose up --build
}

# Function to run tests
run_tests() {
  echo "Running tests..."
  
  # Frontend tests
  echo "Running frontend tests..."
  cd Frontend && pnpm test
  
  # Backend tests
  echo "Running backend tests..."
  cd ../Backend && pnpm test
}

# Function to stop the development environment
stop_dev() {
  echo "Stopping development environment..."
  docker-compose down
}

# Function to clean up
cleanup() {
  echo "Cleaning up..."
  docker-compose down -v
  rm -rf Frontend/node_modules Backend/node_modules
}

# Parse command line arguments
case "$1" in
  "start")
    start_dev
    ;;
  "test")
    run_tests
    ;;
  "stop")
    stop_dev
    ;;
  "clean")
    cleanup
    ;;
  *)
    echo "Usage: $0 {start|test|stop|clean}"
    exit 1
    ;;
esac 