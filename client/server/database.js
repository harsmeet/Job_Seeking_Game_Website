const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '',
  user: '', // Your MySQL username
  password: '', // Your MySQL password
  database: '' // Your database name
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Example query
connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});

// Close the connection
connection.end();
