// const express = require('express');
// const cors = require('cors');
// const app = express()
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('hello world')
// })
// app.listen(port, () => {
//     console.log('Starting');
// });

// username=selectCombine
//pass: XujH51GEUyPDKsQb

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;
//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxf10oe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const foodVegetablesCollection = client.db("food").collection("vegetables");
        const snacksDataCollection = client.db("snacks").collection("snacksCollection");
        const dataCollection = client.db("test").collection("devices");

        // //user pabo khuje...
        // app.get('/user', async (req, res) => {
        //     const query = {};
        //     const cursor = dataCollection.find(query);
        //     const users = await cursor.toArray();
        //     res.send(users);
        // })

        // // //user post kora..
        // app.post('/foods', async (req, res) => {
        //     const newUser = req.body;
        //     console.log(newUser);
        //     const result = await foodVegetablesCollection.insertOne(newUser);
        //     res.send(result)
        // })

        //user post kora..
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await dataCollection.insertOne(newUser);
            res.send(result)
        })
        //get kora..
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dataCollection.deleteOne(query);
            res.send(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to our select and combine server site')
})
app.listen(port, () => {
    console.log('Starting');
});