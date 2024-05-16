require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
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


// route middleware

app.use('/api',authRoutes)
app.use('/recipes',recipeRoutes)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});






