const connectToMongo = require('./db');
connectToMongo();  // Connect to MongoDB

const express = require('express');
var cors = require('cors')
const app = express();
const port = 4000;
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`iNotebook app listening at http://localhost:${port}`);
});
