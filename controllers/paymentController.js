const Product=require("../models/products");
const Users=require("../models/credentials");
const Payment = require('../models/payment');
const Transaction = require("../models/transactions");
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const makePayment = async (req,res,next) =>{
    console.log('Inside Payment ROute');
    let email=res.locals.details;
    let cart = req.body.cart;
    const profile = Users.find({email: email});

    try {
        //const pid = array.map(product => product.pid);
        //const products = await Product.find({"pid" : {"$in" : pid}});
        
        const products = [{pid: 1, price:1000}, {pid: 2, price:1000}]
        //console.log(cart)

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: "payment",
          line_items: cart.map(item => {
            // var ref = products.filter((x) => { return x.pid == item.pid; });
            // console.log(ref)
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: item.productName,
                },
                unit_amount: (item.price/item.quantity)*100,
              },
              quantity: item.quantity,
            }
          }),
          // customer_email:
          success_url: `${process.env.CLIENT_BASE_LOCAL}/payments/success`,
          cancel_url: `${process.env.CLIENT_BASE_LOCAL}/payments/cancel`,
          metadata: {
            email: email,
            name: profile.name,
            phone: profile.phoneno
          }
        })
        res.json({ url: session.url })
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
      }
}


const endpointSecret = 'whsec_wAvldwHWDP2ns7fKmkrSauOXpeqzcdDj';


const saveOrder = async(session) => {
  console.log(session);
  console.log(session);
  const query = new Transaction({
    transactionId: session.id,
    paymentMode: session.payment_method_types[0],
    amount: session.amount_total,
    senderName: session.customer_details.name,
    time: session.created,
    // recvName: session.
  })

  await query.save();
  // Payment.create({email: session.metadata.cusEmail, rawData: session });
  console.log("Added Payment");
}

const declinePayment = (session) => {
  // TODO: Payment failed ?? 
  console.log("Payment Failed");
}

const webhookHandler = async(request, response) => {
  console.log('inside the webhook handler');
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    // console.log(err)
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

    
      if (session.payment_status === 'paid') {
        saveOrder(session);
      }

      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      declinePayment(session);

      break;
    }
  }

  response.status(200).end();
};

module.exports = {
    makePayment,
    webhookHandler
}