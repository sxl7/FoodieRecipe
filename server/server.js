require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schemaModel = require('./models/schema')

const  recipeRoutes = require('./routes/remoteRecipeRoute');


const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//DB connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// route api
app.get('/api/userinfos',async(req,res) =>{
  const result = await schemaModel.UserModel.find();
  res.json(result)
})

app.use('/api',recipeRoutes)




/* app.use('/api/usersinfos',userInfoRoute)

app.get('/api/recipes/search',async(req,res) =>{
  try{
      const searchItem = req.query.searchItem;
      const page = parseInt(req.query.page);
      const result = await recipeUtils(searchItem,page);
      return res.json(result);
  }catch(e){
      console.log(e.message)
  }
}) */





// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});











/* run()

async function run(){
  try{
    const u = await schemaModel.UserModel.create({ 
      userName:'lol',  
      password: '666',
      email: '1234@getMaxListeners.com',
      preference:"asd"
    })
    await u.save()
    const user = new schemaModel.UserModel({  
      userName:'lol',
      password: '123666',
      email: 'testing1235@getMaxListeners.com',
      preference:"asddddd"
    })
      await user.save()
      console.log(user)
  } catch(e){
    console.log(e.message)
  }
} */


