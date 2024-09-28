# Deploy_Hub

## Overview

This project is a clone of Vercel, allowing users to create projects by submitting GitHub repository URLs. It uses a Node.js backend with Express, AWS ECS for task management, Redis for messaging, and Socket.IO for real-time updates. The frontend is a simple web interface built with HTML, CSS, and JavaScript.

![DeployHub](https://github.com/Prasad2357/Deploy_Hub/raw/main/Images/Deploy-Hub.png) 
![Deployed Project](https://github.com/Prasad2357/Deploy_Hub/raw/main/Images/Deployed-Project.png)

## Features

- **Project Creation**: Users can create a project by providing a GitHub repository URL.
- **Real-Time Messaging**: Users receive real-time updates about their project status through a WebSocket connection.
- **AWS Integration**: The application interacts with AWS ECS to run tasks in a serverless manner.

## Project Structure

### 1. Build Server

This folder contains the setup for building and deploying the project.

- **Dockerfile**: Sets up the environment with necessary dependencies such as Node.js and Git. It copies the required scripts and sets the entry point to `main.sh`.
- **main.sh**: Clones the GitHub repository specified by `GIT_REPOSITORY_URL` and executes `script.js`.
- **script.js**: Handles the build process by running npm commands to install dependencies and build the project. It then uploads the build output to an S3 bucket.

### 2. S3 Reverse Proxy

This folder contains the reverse proxy setup to serve files from the S3 bucket.

- **index.js**: Uses Express and `http-proxy` to serve the files stored in the S3 bucket. It dynamically routes requests based on the subdomain and serves the `index.html` file if no specific file is requested.

### 3. API Server

This folder contains the API server that orchestrates the deployment process.

- **server.js**: Sets up an Express server that listens for POST requests to create a new project. It triggers an ECS task that runs the build server container with the specified GitHub repository URL. Once the build is complete, it provides a URL to access the deployed site via the reverse proxy.

### 4. Frontend

This folder contains the React application for interacting with the API server.

- **src/ProjectForm.js**: A React component for submitting a GitHub repository URL and optionally a slug. It sends this data to the API server and displays the deployment URL.
- **src/App.js**: The main React component that includes `ProjectForm` and sets up the Material-UI theme for a beautiful UI.
- **src/index.js**: The entry point for the React application.
- **public/index.html**: The HTML file that contains a div with an id of `root`. This is where the React application is injected.

## Tech Stack

- **Docker**: Containerization of the build server for consistent and reproducible builds.
- **Node.js**: Server-side JavaScript environment used in both the build server and reverse proxy.
- **Express**: Web framework for Node.js used to create the API server and reverse proxy server.
- **AWS ECS (Elastic Container Service)**: Orchestrates the Docker containers to manage the build process.
- **AWS S3 (Simple Storage Service)**: Stores the build outputs and serves static files.
- **AWS ECR (Elastic Container Registry)**: Stores Docker images for deployment.
- **http-proxy**: Middleware to handle reverse proxying of requests to the correct S3 locations.
- **random-word-slugs**: Utility for generating unique project slugs.
- **React**: Frontend library for building the user interface.
- **Material-UI**: React component library for a beautiful and consistent UI design.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker
- An AWS account with ECS configured
- A Redis instance (local or hosted)

### Installation Steps

1. Clone the repository and navigate to the project directory.
2. Install backend dependencies in the API server directory.
3. Set up the Redis configuration in your backend code.
4. Run the backend server.
5. Navigate to the frontend directory.
6. Start the React application.

## How It Works

1. **User submits a GitHub repository URL**: The API server receives this URL and generates a unique project slug.
2. **Trigger ECS task**: The API server sends a command to ECS to run the build server container, passing the GitHub URL and project slug as environment variables.
3. **Build process**: The build server clones the repository, installs dependencies, builds the project, and uploads the output to the S3 bucket.
4. **Serve the site**: The S3 reverse proxy serves the built site, making it accessible via a URL that includes the project slug.

Deploy_Hub integrates Docker for containerization, ECS for orchestration, S3 for storage, and a reverse proxy to serve the built websites seamlessly. This setup ensures a scalable and efficient deployment pipeline for web applications.

## Usage

- Open your browser and navigate to http://localhost:8080 (or the port you are using for your frontend).
- Enter your GitHub repository URL and click the "Create Project" button.
- You will see the project status and receive real-time messages from the server.

## API Endpoints

### POST /project

- **Description**: Creates a new project by triggering an ECS task.

- **Request Body**:

   {
     "gitURL": "https://github.com/user/repo"
   }

- **Response**:

   {
     "status": "queued",
     "data": {
       "projectSlug": "generated-slug",
       "url": "http://generated-slug.localhost:8000"
     }
   }

## Socket Events

- **Message Event**: Receives messages from the Redis subscriber.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- AWS
- Redis
- Socket.IO

### Customization

- **Update the Repository URL**: Replace `<your-repo-url>` with the actual URL of your GitHub repository.

- **Add License**: If you have a specific license file, include it in your repository and link to it in the README.
