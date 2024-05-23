require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/remoteRecipeRoute");
const favoriteRoutes = require("./routes/favorite");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://foodie-recipe-5cgy.vercel.app/'
}));
//DB connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// route middleware

app.use("/api", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/api", favoriteRoutes);

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the server!"); // Modify this response as needed
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
