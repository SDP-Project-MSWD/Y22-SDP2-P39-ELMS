const mongoose = require('mongoose'); 
require('dotenv').config(); 
 
const uri = process.env.MONGO_DB_URL;
const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}; 
 
mongoose.connect(uri, options) 
  .then(() => console.log('Connected to MongoDB ELMS...')) 
  .catch((err) => console.error('Could not connect to MongoDB ELMS.', err)); 
 
const db = mongoose.connection; 
module.exports = db;