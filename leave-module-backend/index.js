const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path'); 
const db = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const multer = require('multer');
const csv = require('csvtojson');
const Users = require('./models/Users');
const verifyToken = require("./middleware/authMiddleware");

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure CORS
app.use(cors());

const corsOptions = {
    origin: '',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

db.once('open', () => {
    console.log('Database connection is open.');
});

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/manager', managerRoutes);
app.use('/user', dashboardRoutes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use('/uploads', express.static('uploads'));

const upload = multer({ storage });

app.post('/uploadcsv', upload.single("csvFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const jsonArray = await csv().fromFile(req.file.path);
        await Users.insertMany(jsonArray);
        console.log("Added to Database");
        return res.send("Added to Database Successfully ");
    } catch (error) {
        console.error("Error uploading file:", error); // Log the specific error
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
    console.log("KLU Server is Launch...");
});
