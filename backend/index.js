import express from 'express';
import mysql from 'mysql';
import cors from 'cors'; 

const app = express();


// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sid123',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Listing Platform!');
});

// Get all restaurants
app.get('/restaurants', (req, res) => {
  const query = 'SELECT * FROM resturant'; // table name

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching restaurants:', err);
      res.status(500).json({ error: 'Error fetching restaurants' });
    } else {
      res.json(results);
    }
  });
});



// Add new restaurant
app.post('/restaurants', (req, res) => {
  const { name, address, contact } = req.body;
  const insertQuery = 'INSERT INTO resturant (name, address, contact) VALUES (?, ?, ?)';

  db.query(insertQuery, [name, address, contact], (err, results) => {
    if (err) {
      console.error('Error creating restaurant:', err);
      res.status(500).json({ error: 'Error creating restaurant' });
    } else {
      res.json({ message: 'Restaurant created successfully', restaurantId: results.insertId });
    }
  });
});

// Update restaurant
app.put('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;
  const updateQuery = 'UPDATE resturant SET name=?, address=?, contact=? WHERE id=?';

  db.query(updateQuery, [name, address, contact, id], (err, results) => {
    if (err) {
      console.error('Error updating restaurant:', err);
      res.status(500).json({ error: 'Error updating restaurant' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
    } else {
      res.json({ message: 'Restaurant updated successfully' });
    }
  });
});

// Delete restaurant
app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM resturant WHERE id=?';

  db.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting restaurant:', err);
      res.status(500).json({ error: 'Error deleting restaurant' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
    } else {
      res.json({ message: 'Restaurant deleted successfully' });
    }
  });
});




// Start the server
app.listen(8000, () => {
  console.log('Connected to backend!');
});
