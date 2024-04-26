const stripe = require('stripe')("sk_test_51P8cMBSHJm8QTjfD8Rh4Jfyt2RLehPbShMxDNLmlNZmzhbeDpI3xNdQkJ00IlXsKVFRu38gCUOhoZeZfzcZkg3F200V83PTACe");
const { v4: uuidv4 } = require('uuid');


module.exports.createPayment = async (req, res) => {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4();
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            // source: token.id,
        });
        console.log("customer HERE", customer);
        console.log("token HERE", token);

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: token.id,
            },
        });
        console.log("paymentMethod HERE", paymentMethod);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100,
            currency: 'INR',
            customer: customer.id,
            payment_method: paymentMethod.id,
        });
        console.log("paymentIntent HERE", paymentIntent);

        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
        console.log("confirmedPaymentIntent HERE", confirmedPaymentIntent);

        return res.status(200).json(confirmedPaymentIntent);
    } catch (err) {
        console.log(err);
    }
};