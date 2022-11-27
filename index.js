const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000 ;

// medillwares

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USEDPHONE_USER}:${process.env.USEDPHONE_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

     try{

          const productCollection = client.db('usedphone').collection('product');
          const categoryCollection = client.db('usedphone').collection('categories');
          const usersCollection = client.db('usedphone').collection('users');
          const ordersCollection = client.db('usedphone').collection('orders');

          app.get('/categories', async (req, res)=>{
               const query = {};
               const cursor =  categoryCollection.find(query);
               const product = await cursor.toArray()
               res.send(product)
          })

          app.get('/category/:id', async (req, res)=>{
               const id = req.params.id;
               const query = {category_id: id};
               const cursor =  productCollection.find(query);
               const product = await cursor.toArray()
               res.send(product)

          })

          // app.post('/users', async(req, res)=>{
          //      const user = req.body;
          //      const result = await usersCollection.insertOne(user)
          //      res.send(result)
          // })

          app.post('/orders', async (req, res)=>{
               const order = req.body;
               const result = await ordersCollection.insertOne(order)
               res.send(result)
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
