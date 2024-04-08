
require('dotenv').config();

const fs = require('fs');
const { Parser } = require('json2csv');
const path = require('path');
const config = require('./config');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${config.MongoUserName}:${config.MongoDB_PW}@cluster0.olulfjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function getUniqueFilename(outputDir, baseName) {
    let index = 1;
    let filename = baseName;
    while (fs.existsSync(path.join(outputDir, filename))) {
        filename = `${baseName}_${index}.csv`;
        index++;
    }
    return filename;
}

async function exportToCSV(collection) {
    const query = {}; 
    const projection = {}; 

    try {
        const cursor = collection.find(query, projection);
        const items = await cursor.toArray();

        if (items.length > 0) {
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(items);

            
            const outputDir = path.join(__dirname, 'output');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            // make filename with today's date in EST
            const options = { timeZone: 'America/New_York' };
            const today = new Date().toLocaleString('en-US', options).split(',')[0].replaceAll('/', '-');
            let filename = `Output-${today}.csv`;
            filename = await getUniqueFilename(outputDir, filename);
            const filePath = path.join(outputDir, filename);

            // write to csv
            fs.writeFileSync(filePath, csv);
            console.log(`Data exported to ${filePath}`);
        } else {
            console.log('No documents found in the collection.');
        }
    } catch (error) {
        console.error('Error exporting data to CSV:', error);
    }
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        //here

        // Connect to MongoDB
        await client.connect();
        const database = client.db(`${config.MongoDB}`);
        const collection = database.collection(`${config.MongoCollection}`);
        await exportToCSV(collection);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
