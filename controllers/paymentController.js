const Product=require("../models/products");
const Users=require("../models/credentials");
const Payment = require('../models/payment')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const makePayment = async (req,res,next) =>{
    let email=req.body.email;
    let cart = req.body.cart;

    try {
        //const pid = array.map(product => product.pid);
        //const products = await Product.find({"pid" : {"$in" : pid}});
        
        const products = [{pid: 1, price:1000}, {pid: 2, price:1000}]
        //console.log(cart)

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: cart.map(item => {
            var ref = products.filter((x) => { return x.pid == item.pid; });
            console.log(ref)
            return {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "hello",
                },
                unit_amount: 10000,
              },
              quantity: item.quantity,
            }
          }),
          success_url: `${process.env.CLIENT_BASE_LOCAL}/payments/success`,
          cancel_url: `${process.env.CLIENT_BASE_LOCAL}/payments/cancel`,
          metadata: {cusEmail: email},
        })
        res.json({ url: session.url })
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
      }
}


const endpointSecret = 'whsec_b2425836e2e813e7619d5c7c80be369884dd27537a4abd33ec337e90991c8d75';




const saveOrder = (session) => {
  console.log(session);
  Payment.create({email: session.metadata.cusEmail, rawData: session });
  console.log("Added Payment");
  
}

const declinePayment = (session) => {
  // TODO: Payment failed ?? 
  console.log("Payment Failed");
}

const webhookHandler = async(request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err)
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