# Fitty

A web app where you can store your workouts and diets

# Getting Started

## Prerequisites

You'll need to have [Nodejs](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/manual/installation/) installed on your PC before you can run a development environment.

## Running the Project on your local system

To run the website on your local system, execute the following commands, you will need two instances of a CLI

1. Clone the repo
   `git clone https://github.com/ClassifiedEgg/DBMSProject <directory name>`
2. cd into the directory
   `cd <directory name>`
3. Install the dependencies for client
   `cd client && npm install && cd ..`
4. cd into server sub directory
   `cd server`
5. Install the dependencies
   `npm install`
6. Start, both, client and server at the same time using Concurrently
   `npm run start`

## Databse Name

By default, the website creates a 'dbms' collection on your local mongoDB system. If you wish to change the name, follow the steps given below

1. Clone the repo
   `git clone https://github.com/ClassifiedEgg/DBMSProject <directory name>`
2. cd into the directory
   `cd <directory name>`
3. cd into the config folder
   `cd config`
4. Here, in default.js, edit the mongoURI as listed below
   from
   `mongodb://localhost:27017/dbms`
   to
   `mongodb://mongo:27017/<your custom name>`

The above method runs both, server and client, process on a single instace of your CLI using Concurrently. If you wish to run them seperately, follow the below listed commands. (NOTE: You will require two instances of a CLI)

1. Clone the repo
   `git clone https://github.com/ClassifiedEgg/DBMSProject <directory name>`
2. cd into the directory
   `cd <directory name>`
3. On your first CLI instance, cd into the server sub directory
   `cd server`
4. Install the dependencies
   `npm install`
5. Start the server
   `node server.js`
6. On your second CLI instance, cd into the clinet sub directory
   `cd client`
7. Install the dependencies
   `npm install`
8. Start React
   `npm run start`

## Running the project using Docker

You can also run the web app docker, just follow the steps provided below

1. Clone the repo
   `git clone https://github.com/ClassifiedEgg/DBMSProject <directory name>`
2. cd into the directory
   `cd <directory name>`
3. cd into the config folder
   `cd config`
4. Here, in default.js, edit the mongoURI as listed below
   from
   `mongodb://localhost:27017/dbms`
   to
   `mongodb://mongo:27017/dbms`
5. cd back into the main directory
   `cd .. && cd ..`
6. cd into the client sub directory
   `cd client`
7. Here, in package.json, edit the proxy as listed below
   from
   `http://localhost:5000`
   to
   `http://server:5000`
8. cd back into the main directory
   `cd ..`
9. Run Docker Compose  
   `docker compose up`

NOTE: The web app has been mapped to port 3000 on your local system, if you wish to map it to a different port, edit the docker-compose.yml as given below

After the tag ports, you will see
`- "3000:3000"`
Here, change the first number to the port you wish the website to be accisble on
`- "<your port>:3000`

# Teachnologies Used

- MongoDB -> Database
- Node.js -> Server
- React -> Frontend

# Contributors

- Ashish Reddy (181CO111)
- Dhiraj Lokesh (181CO118)
