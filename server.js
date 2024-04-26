process.loadEnvFile();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const stripe = require('stripe')("sk_test_51P8cMBSHJm8QTjfD8Rh4Jfyt2RLehPbShMxDNLmlNZmzhbeDpI3xNdQkJ00IlXsKVFRu38gCUOhoZeZfzcZkg3F200V83PTACe");

const rolesRoutes = require("./routes/roles.js");
const productsRoute = require("./routes/product.js");
const authentication = require("./routes/user.js");
const paymentRoutes = require("./routes/payment.js");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.raw({ type: 'application/json' }));
// Connect to MongoDB
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/', authentication)
app.use('/payment', paymentRoutes)
app.use('/api', productsRoute);
app.use('/roles', rolesRoutes);
app.post('/hooks', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  console.log("webhookHandler FUNCTION TRIGGERED");

  let signInSecret = "whsec_34a56332c3e6585b577c8f0774c34ab696d14428d2d27c56cdc7c9ccd414c4fb";
  console.log("req.body", req.body);
  const payload = req.body;
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, signInSecret);
  } catch (error) {
    console.log("error", error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  console.log("EVENT", event);
  console.log("EVENT OBJECT", event.data.object);
  console.log("EVENT OBJECT ID", event.data.object.id);

  return res.status(200).json({ received: true });
})
// Start the server on port 3000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
