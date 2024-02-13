const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const multer = require('multer');
const LandModel = require('../models/landModels');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Land = LandModel;

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'sivarasanithushna@gmail.com',
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'your_destination_folder'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage: storage }).single('image');

const createLandEntry = async (req, res) => {
  try {
    imageUpload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: 'Multer error' });
      } else if (err) {
        return res.status(500).json({ error: 'Unknown error' });
      }

      const { image, ...landData } = req.body;

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'fieldlinker',
      });

      const lands = new Land({
        ...landData,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      const savedLand = await lands.save();

      await sendEmail(savedLand.email, 'Land Submission Confirmation', 'Thank you for submitting your land details.');

      res.status(201).json(savedLand);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const getFilteredLands = async (req, res) => {
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
    console.error('Error fetching lands:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllLandsAdmin = async (req, res) => {
  try {
    const allLands = await Land.find();
    res.status(200).json(allLands);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getSpecificLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.status(200).json(land);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateSpecificLandById = async (req, res) => {
  try {
    const updatedLand = await Land.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file },
      { new: true }
    );

    if (!updatedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    res.status(200).json(updatedLand);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const softDeleteSpecificLandById = async (req, res) => {
  try {
    const landId = req.params.id;

    const updatedLand = await Land.findByIdAndUpdate(
      landId,
      { ispost: false },
      { new: true }
    );

    if (!updatedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    return res.json(updatedLand);
  } catch (error) {
    console.error('Error deleting land:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
 createLandEntry,
  getFilteredLands,
  getAllLandsAdmin,
  getSpecificLandById,
  updateSpecificLandById,
  softDeleteSpecificLandById,
};
