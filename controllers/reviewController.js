const Review = require("../models/reviews");
const Users = require("../models/credentials");
const { sendReview } = require("../utilities/sendReview");

const postReview = async (req, res) => {
  try {
    let email = req.body.email;
    const profile = await Users.findOne({ email: email });
    console.log(profile);
    const query = new Review({
      name: profile.name,
      email: req.body.email,
      phonenum: profile.phoneno,
      review: req.body.review,
    });

    await query.save();

    console.log("After Saving Query");

    sendReview(email, {
      name: profile.name,
      number: profile.phoneno,
      review: req.body.review,
    });

    res.status(201).json({ message: "Review added !!" });
  } catch {
    res.status(404).json({ message: "Error in Connection." });
  }
};

module.exports = {
  postReview,
};
