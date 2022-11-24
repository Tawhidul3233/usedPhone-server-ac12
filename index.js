const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000 ;

// medill wares

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.USEDPHONE_USER}:${process.env.USEDPHONE_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

     try{

          const productCollection = client.db('usedphone').collection('product');

          app.get('/category/:id', async (req, res)=>{
               const id = req.params.id;
               console.log(id)
               const query = {category_id: id};
               console.log(query)
               const cursor =  productCollection.find(query);
               const product = await cursor.toArray()
               res.send(product)

          })

     }


     finally{

     }

}

run().catch(error => console.log(error))

app.get('/', (req, res) => {
     res.send('server runing')
})

app.listen(port, () => {
     console.log(`runing on ${port}`)
})
