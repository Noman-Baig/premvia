const express = require("express");
const nodemailer = require("nodemailer");
const Stripe = require("stripe");
const mongoose = require("mongoose");
// const cors = require("cors");
app.use(
  cors({
    origin: "https://premvia.com", // Allow only your frontend domain
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const app = express();
require("dotenv").config();

const dbKey = process.env.MONGO_DB;
const secretKey = process.env.STRIPE_SECRET;

const stripe = Stripe(`${secretKey}`);

// MongoDB connection
mongoose
  .connect(`${dbKey}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail service
  auth: {
    user: "fixprob.soft@gmail.com", // Your Gmail email address
    pass: "vxkdrulpnrdvuvgv", // Your app-specific password (generated on Google)
  },
});

// Product Model
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  id: { type: Number, required: true },
  images: { type: [String], required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
// }));
app.use(cors());

// Payment endpoint
app.post("/api/payment", async (req, res) => {
  const { paymentMethodId, totalAmount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "https://premvia.com",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add Product API
app.post("/api/products", async (req, res) => {
  const { id, productName, price, images, description } = req.body;

  try {
    const newProduct = new Product({
      id,
      productName,
      price,
      images,
      description,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch products API
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Return the products as a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ id: productId }); // Use `id` instead of `_id`
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product); // Return the product as JSON
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.post("/send-email", (req, res) => {
  // console.log("Request body:", req.body);
  const {
    name,
    address,
    city,
    state,
    country,
    zipcode,
    phone,
    totalAmount,
    cartItems,
  } = req.body;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = hours + ":" + minutes + " " + ampm;

  const mailOptions = {
    from: "fixprob.soft@gmail.com", // Sender's email
    to: "fixprob.sol@gmail.com", // Recipient's email
    subject: "Order", // Email subject
    html: `
      <h3>New Order Details</h3>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formattedTime}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${address}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Zipcode:</strong> ${zipcode}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Total Amount:</strong> $${totalAmount}</p>
      <h4>Cart Items:</h4>
        <pre>${JSON.stringify(req.body, null, 2)}</pre>
    `, // HTML content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log("Error:", error);
      return res.status(500).send("Error sending email");
    }
    //   console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully!");
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on https://api.premvia.com");
});
