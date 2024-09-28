# Vercel Clone

## Overview

This project is a clone of Vercel, allowing users to create projects by submitting GitHub repository URLs. It uses a Node.js backend with Express, AWS ECS for task management, Redis for messaging, and Socket.IO for real-time updates. The frontend is a simple web interface built with HTML, CSS, and JavaScript.

![DeployHub](https://github.com/Prasad2357/Deploy_Hub/raw/main/Images/Deploy-Hub.png) 
![Deployed Project](https://github.com/Prasad2357/Deploy_Hub/raw/main/Images/Deployed-Project.png)

## Features

- **Project Creation**: Users can create a project by providing a GitHub repository URL.
- **Real-Time Messaging**: Users receive real-time updates about their project status through a WebSocket connection.
- **AWS Integration**: The application interacts with AWS ECS to run tasks in a serverless manner.

## Tech Stack

- **Backend**:
  - Node.js
  - Express
  - AWS SDK (ECS)
  - Redis
  - Socket.IO

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- An AWS account with ECS configured
- A Redis instance (local or hosted)

### Installation

1. Clone the repository:

   - git clone <your-repo-url>
   - cd vercel_clone

2. Install backend dependencies:

   - cd api-server
   - npm install

3. Set up the Redis configuration in your backend code.

4. Run the backend server:

   - node index.js

5. Set up the frontend:

   - Navigate to the frontend directory:
   - cd frontend

6. Serve the frontend:

   - http-server

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
