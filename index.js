const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// Mongo Connect set user/pass using .env 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bllil.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// main function working for server 
async function run() {
    try {

        //--------
        await client.connect();
        const tasksCollection = client.db("toDoTaskData").collection("tasks");

        // Get All Data From Database or MDB
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = tasksCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks)
        })
        // Data in Database MDB
        app.post('/task',  async (req, res) => {
            const task = req.body;
            const result = await tasksCollection.insertOne(task)
            res.send(result);
        })
        // DELETE items from database & UI
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        })
        //--------

    } finally { }
}
run().catch(console.dir)

// for get main routing and testing  -
app.get('/', (req, res) => {
    res.send('Simple to-do app Server is Running')
});

app.listen(port, () => {
    console.log('Simple to-do app Server Listening to port', port);
})
