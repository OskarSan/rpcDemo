Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.
Prerequisites

    Node.js (v14 or higher)
    npm (v6 or higher)
    MongoDB

Installation
1. Clone the Repository
2. Install dependencies

install project dependencies

npm install

Install client dependencies

cd client
npm install

Install server dependencies

cd ../server
npm install

3. Set Up Environment Variables

Create .env file in the client directory with the following content:

VITE_API_URL = http://localhost:3000

Create .env file in the server directory with the following content:

PORT=3000
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
GOOGLE_CALLBACK_URL = http://localhost:3000/user/auth/google/callback

    Run the project

Navigate to the root folder and “npm run start”. This will start the clien and server concurrently
