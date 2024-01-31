# Recruiter Tool

This is a web application designed to help recruiters manage candidates during the hiring process.

## Setup

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL installed and running locally

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/aryan2701/Recruiter-tool.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Recruiter-tool
    ```

3. Install dependencies for both the frontend and backend:

    ```bash
    cd recruiter-tool-frontend
    npm install

    cd ../recruiter-tool-backend
    npm install
    ```

4. Set up the PostgreSQL database:
   
   - Create a new database named `recruiter_tool` in your local PostgreSQL instance.
   - Use the provided SQL script to create the `candidates` table:

     ```bash
     psql -U <your_username> -d recruiter_tool -a -f schema.sql
     ```

### Configuration

1. In the `recruiter-tool-backend` directory, create a `.env` file and add the following environment variables:

    ```makefile
    DB_USERNAME=<your_database_username>
    DB_PASSWORD=<your_database_password>
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=recruiter_tool
    ```

2. Modify the `DB_USERNAME` and `DB_PASSWORD` variables with your PostgreSQL credentials.

### Running the Application

1. Start the backend server:

    ```bash
    cd recruiter-tool-backend
    npm start
    ```

    This will start the backend server at `http://localhost:10000`.

2. Start the frontend development server:

    ```bash
    cd ../recruiter-tool-frontend
    npm start
    ```

    This will start the frontend server and open the application in your default web browser.

## Usage

- Access the application at `http://localhost:3000`.
- Use the Add Candidate form to add new candidates to the system.
- View and manage candidates in the Candidate List section.
