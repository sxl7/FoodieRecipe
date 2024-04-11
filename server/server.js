require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const UserModel = require('./models/Users')

const app = express();
const PORT = process.env.PORT || 5000;

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
  const result = await UserModel.find();
  res.json(result)
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


