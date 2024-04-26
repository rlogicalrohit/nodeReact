const stripe = require('stripe')("sk_test_51P8cMBSHJm8QTjfD8Rh4Jfyt2RLehPbShMxDNLmlNZmzhbeDpI3xNdQkJ00IlXsKVFRu38gCUOhoZeZfzcZkg3F200V83PTACe");


module.exports.webhookHandler = async (req, res) => {
    console.log("webhookHandler FUNCTION TRIGGERED");

    let signInSecret = "whsec_34a56332c3e6585b577c8f0774c34ab696d14428d2d27c56cdc7c9ccd414c4fb";
    const payload = req.body;
    const signature = req.headers["stripe-signature"];

    let event;
    try {
        event = await stripe.webhooks.constructEvent(payload, signature, signInSecret);
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);

    }
    console.log("EVENT", event);
    console.log("EVENT OBJECT", event.data.object);
    console.log("EVENT OBJECT ID", event.data.object.id);
    return res.status(200).json({ received: true });
}