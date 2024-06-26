
# MongoDB to CSV Exporter

This script connects to a MongoDB database, fetches data from a specified collection, and exports it to a CSV file. The CSV file is named with today's date in the Eastern Time Zone and stored in an 'output' folder within the same directory as the script.

## Prerequisites

- Node.js installed on your machine
- MongoDB database URI
- MongoDB collection name

## Setup

1. Clone or download this repository to your local machine.

2. Install dependencies by running the following command in the terminal:

   ```bash
   npm install

## .env File Setup
Create a .env file in the project directory and add the following environment variables:

```
PORT=5000
MongoDB_PW=your_mongodb_password
MongoUserName=your_mongodb_username
MongoDB=your_database_name
MongoCollection=your_collection_name
```

Replace your_mongodb_password, your_mongodb_username, your_database_name, and your_collection_name with your MongoDB database credentials and collection name.


Run the script using the following command:


   ```bash
   node index.js
   ```
## Features
- Fetches data from a MongoDB collection.
- Exports data to a CSV file with today's date in the Eastern Time Zone.
- Handles duplicate filenames by appending a number to the filename.

## Dependencies
- dotenv - For loading environment variables from a .env file.
- mongodb - MongoDB driver for Node.js.
- json2csv - Converts JSON data to CSV format.


