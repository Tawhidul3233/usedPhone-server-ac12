const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000 ;

// medill wares

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USEDPHONE_USER}:${process.env.USEDPHONE_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
     res.send('server runing')
})

app.listen(port, () => {
     console.log(`runing on ${port}`)
})
