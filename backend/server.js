//database --> react_form,
//table --> form_data.


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DYP@SQL1221',
    database: 'react_form'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Define the API endpoint to handle form submission
app.post('/formdata/add', (req, res) => {
    const formData = req.body;

    const sql = 'INSERT INTO form_data (firstName, lastName, email, contact, gender, url1, url2, selectedOption, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.firstName, formData.lastName, formData.email, formData.contact, formData.gender, formData.url1, formData.url2, formData.selectedOption, formData.about];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.send('Data inserted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
