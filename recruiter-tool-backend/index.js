const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3001;
const candidatesRoutes = require('./routes/candidates');
const pgp = require('pg-promise')();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to PostgreSQL database
const db = pgp({
  connectionString: 'postgres://recruiterdb:7AcAJ8Bd3VRcespXV72XadoSyonniJtN@dpg-cmsk7m8l5elc738rjqb0-a.oregon-postgres.render.com/recruiterdb_1lp4',
  ssl: {
    rejectUnauthorized: false, // This option is required if your PostgreSQL server is using self-signed certificates
  },
});


// Test database connection
db.one('SELECT $1 AS value', 123)
  .then(data => {
    console.log('Connected to PostgreSQL:', data.value);
  })
  .catch(error => {
    console.log('Error connecting to PostgreSQL:', error);
    process.exit(1); // Exit process if unable to connect to the database
  });

// Mount candidates routes
app.use('/candidates', candidatesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
