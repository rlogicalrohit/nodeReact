process.loadEnvFile();
const  express  = require("express");
const authentication = require("./routes/user.js");
const mongoose  = require('mongoose');
const route = require("./routes/product.js");
const cors = require('cors');
const morgan = require('morgan');
// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
app.use('/',authentication)
app.use('/api', route);

// Start the server on port 3000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
