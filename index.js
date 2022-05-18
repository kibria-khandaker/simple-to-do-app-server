const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// // Mongo Connect set user/pass using .env 
// const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bllil.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


// // main function working for server 
// async function run() {
//     try {
//         //--------

//         //--------
//     } finally { }
// }
// run().catch(console.dir)








// for get main routing and testing 
app.get('/', (req, res) => {
    res.send('To Do List Server is Running')
});

app.listen(port, () => {
    console.log('To Do Server Listening to port', port);
})
