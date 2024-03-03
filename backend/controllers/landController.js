const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Invoice = require("../models/Invoice");
const Land = require("../models/landModels");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "sivarasanithushna@gmail.com",
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

const generateInvoiceId = () => {
  return uuidv4();
};

exports.createPayment = async (req, res) => {
  try {
    const { paymentMethodId, cardholderName, landId } = req.body;
    console.log("Request Body:", req.body);

    const land = await Land.findById(landId);
    if (!land) {
      return res.status(404).json({ error: "Land not found" });
    }

    const priceId = "price_1Oon0VGUJNDaDPYQGqGDqUqJ";
    const price = await stripe.prices.retrieve(priceId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      payment_method: paymentMethodId,
      description: "Payment for your land ad fee",
      confirm: true,
      return_url: `http://localhost:7100/api/bill/${landId}`,
    });

    const invoice = new Invoice({
      paymentIntentId: paymentIntent.id,
      landId: land._id,
      amount: price.unit_amount / 100,
      cardholderName: cardholderName,
      status: "paid",
      InvoiceId: generateInvoiceId(),
    });

    await invoice.save();

    land.Pay = "paid";
    await land.save();

    res.status(200).json({ message: "Payment successful", paymentIntent });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createLand = async (req, res) => {
  try {
    const { image, ...landData } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "fieldlinker",
    });

    const land = new Land({
      ...landData,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      pay: "pending",
    });

    const savedLand = await land.save();
    const emailMessage = `Thank you for submitting your land details.`;
    await sendEmail(
      savedLand.email,
      "Land Submission Confirmation",
      emailMessage
    );

    res.status(201).json(savedLand);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllLands = async (req, res) => {
  try {
    const filters = req.query;
    const filterObject = { ispost: true };

    if (filters.landType) {
      filterObject.landType = filters.landType;
    }

    if (filters.rentOrLease) {
      filterObject.rentOrLease = filters.rentOrLease;
    }

    if (filters.location) {
      filterObject.location = filters.location;
    }

    const lands = await Land.find(filterObject);

    res.json(lands);
  } catch (error) {
    console.error("Error fetching lands:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getFilterValues = async (req, res) => {
  try {
    const filterObject = { ispost: true };

    const cropTypes = await Land.distinct("landType", filterObject);
    const rentOrLeaseOptions = await Land.distinct("rentOrLease", filterObject);

    res.json({ cropTypes, rentOrLeaseOptions });
  } catch (error) {
    console.error("Error fetching filter values:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllLandsAdmin = async (req, res) => {
  try {
    const allLands = await Land.find();
    res.status(200).json(allLands);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }
    res.status(200).json(land);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateLandById = async (req, res) => {
  try {
    const { ispost, otherDetails, status } = req.body;

    const updatedFields = { otherDetails, status, ispost };

    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedLand) {
      return res.status(404).json({ message: "Land not found" });
    }

    console.log("Updated Land:", updatedLand);

    if (updatedLand.ispost === true) {
      console.log("Sending email to:", updatedLand.email);
      const emailMessage = `Your land listing with ID ${req.params.id} has been approved and is now visible to users.`;
      await sendEmail(updatedLand.email, "Land Listing Approved", emailMessage);
      console.log("Email sent successfully");
    } else {
      console.log("Email not sent because ispost is not true");
    }

    res.status(200).json(updatedLand);
  } catch (error) {
    console.error("Error updating land:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.softDeleteLandById = async (req, res) => {
  try {
    const landId = req.params.id;

    const updatedLand = await Land.findByIdAndUpdate(
      landId,
      { ispost: false },
      { new: true }
    );

    if (!updatedLand) {
      return res.status(404).json({ message: "Land not found" });
    }

    return res.json(updatedLand);
  } catch (error) {
    console.error("Error deleting land:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
