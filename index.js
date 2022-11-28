const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');

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

          app.get('/order', async (req, res)=>{
               const email = req.query.email;
               const cursor = {email:email}
               const result = await ordersCollection.find(cursor);
               const orders = await result.toArray()
               res.send(orders)
          })

          app.get('/user', async (req, res)=>{
               const email = req.query.email;
               const cursor = {email:email}
               const result = await usersCollection.find(cursor);
               const orders = await result.toArray()
               res.send(orders)
          })

          app.get('/product', async (req, res)=>{
               const email = req.query.email;
               const cursor = {email:email}
               const result = await productCollection.find(cursor);
               const orders = await result.toArray()
               res.send(orders)
          })

          
          app.get('/allseller', async(req, res)=> {
               const query = {usertype: 'seller'}
               const sellers = await usersCollection.find(query).toArray()
               res.send(sellers)
          })



          app.post('/product', async(req, res)=>{
               const product = req.body;
               const result = await productCollection.insertOne(product);
               res.send(result)
          })

          app.post('/users', async(req, res)=>{
               const user = req.body;
               const query = {email: user.email};
               const cursor = await usersCollection.findOne(query);
               if(cursor) return ;
               const result = await usersCollection.insertOne(user)
               res.send(result)
          })


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
