import * as admin from 'firebase-admin'


var serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length ? admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount)
    }
): admin.app();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fulfillOrder = async (session) => {
    return app.firestore().collection('users').doc(session.metadata.email).collection("orders").doc(session.id).set({
        amount: session.amount_total / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Success: Order:", session.id)
    });
}

async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  }


export default async (req, res) => {
    if(req.method === 'POST') {
        console.log("geldi");
        const requestBuffer = await buffer(req);
        console.log("geldi2");
        
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;
        // verify event came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log(err.message);
            return res.status(400).send(`Webhook err ${err.message}`);
        }

        // handling checkout session completed

        if (event.type === 'checkout.session.completed')
        {
            const session = event.data.object;

            // fulfill order
            return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`Webhook err ${err.message}`));

        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}