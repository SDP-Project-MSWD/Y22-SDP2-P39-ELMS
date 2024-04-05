const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path'); 
const db = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure CORS
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

db.once('open', () => {
    console.log('Database connection is open.');
});

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/manager',managerRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
    console.log("KLU Server is Launch...");
});
