const express = require('express');
const app = express();

// Define a route
app.get("/api", (req, res) => {
  res.json({"users": ["u1", "u2","u3","u4"]})
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});