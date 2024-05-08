const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const multer = require("multer");

const { MongoClient, ObjectId, Binary } = require("mongodb");
const uri =
  "mongodb+srv://sampleuser:Sudheer12@atlascluster.1udqp6g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, location } = req.body;
    const database = await client.db("Harvest-hub");
    const collection = await database.collection("Users");
    console.log("checking");
    // Check if the username already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists. Please choose a different username.",
      });
    }

    // If username is unique, insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword, location };
    await collection.insertOne(newUser);
    console.log("User registered successfully!");
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering user." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  // Check if user exists
  const database = await client.db("Harvest-hub");
  const collection = await database.collection("Users");
  const user = await collection.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  console.log(user.password);
  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("hello");
    return res.status(401).json({ message: "Invalid password" });
  }
  const userType = "customer";
  // Create session and generate JWT token
  const token = jwt.sign({ username: user.username, userType }, "jwtsecret"); // Change this to a more secure secret in production
  // req.session.user = {
  //   _id: user._id,
  //   username: user.username,
  //   email: user.email,
  // };

  res.status(201).json({ token, message: "Login successful" });
});

const upload = multer({ storage: multer.memoryStorage() }); //for storage

app.post("/farmerSignup", upload.single("file"), async (req, res) => {
  try {
    const { username, email, password, location } = req.body;
    const file = req.file;
    console.log(username);
    console.log(email);
    console.log(password);
    // Save the file to the database
    const db = await client.db("Harvest-hub");
    const usersCollection = await db.collection("farmers");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      location,
      isVerified: false,
      file: file ? new Binary(file.buffer) : null,
      fileType: file ? file.mimetype : null,
    };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "Farmer Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Route to handle login requests
app.post("/farmerLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // Check if user exists
    const database = await client.db("Harvest-hub");
    const collection = await database.collection("farmers");
    const user = await collection.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Check if user is verified
    if (!user.isVerified) {
      console.log("check2");
      return res.status(401).json({ message: "Farmer is not verified" });
    }
    console.log("check3");
    const userType = "farmer";
    // Create session and generate JWT token
    const token = jwt.sign({ username: user.username, userType }, "jwtsecret");

    // Redirect to home page upon successful login
    console.log("hello3");
    res.status(201).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  // Check if user exists
  const database = await client.db("Harvest-hub");
  const collection = await database.collection("Admin");
  const user = await collection.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  console.log(user.password);
  // Verify password
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  if (password != user.password) {
    console.log("hello");
    return res.status(401).json({ message: "Invalid password" });
  }

  // Create session and generate JWT token
  //   const token = jwt.sign({ userId: user._id }, "jwtsecret"); // Change this to a more secure secret in production
  //   req.session.user = {
  //     _id: user._id,
  //     username: user.username,
  //     email: user.email,
  //   };
  const userType = "admin";
  // Create session and generate JWT token
  const token = jwt.sign({ username: user.username, userType }, "jwtsecret");
  res.status(201).json({ token, message: "Login successful" });
});
// const db = client.db("Harvest-hub");
app.get("/farmersdata", async (req, res) => {
  try {
    console.log("admin");
    const db = await client.db("Harvest-hub");
    const data = await db
      .collection("farmers")
      .find({ isVerified: false })
      .toArray();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/file/:id", async (req, res) => {
  try {
    console.log("photo");
    const db = await client.db("Harvest-hub");
    const data = await db
      .collection("farmers")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!data || !data.file) {
      return res.status(404).send("File not found");
    }
    res.contentType(data.fileType);
    res.send(Buffer.from(data.file.buffer));
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).send("Server Error");
  }
});

app.put("/api/verify/:id", async (req, res) => {
  try {
    const db = await client.db("Harvest-hub");
    await db
      .collection("farmers")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { isVerified: true } }
      );
    res.sendStatus(200);
  } catch (error) {
    console.error("Error verifying data:", error);
    res.status(500).send("Server Error");
  }
});

//verified customers
app.get("/farmersdata/verified", async (req, res) => {
  try {
    console.log("admin");
    const db = await client.db("Harvest-hub");
    const data = await db
      .collection("farmers")
      .find({ isVerified: true })
      .toArray();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
});

//for adding the crop
app.post("/addCrop", upload.single("file"), async (req, res) => {
  try {
    const { cropName, quantity, price } = req.body;
    const file = req.file;
    console.log(cropName);
    console.log(quantity);
    // Save the file to the database
    const db = await client.db("Harvest-hub");
    const usersCollection = await db.collection("crop-data");
    const newCrop = {
      cropName,
      quantity: parseInt(quantity),
      price,
      file: file ? file.buffer.toString("base64") : null,
      fileType: file ? file.mimetype : null,
    };
    await usersCollection.insertOne(newCrop);

    res.status(201).json({ message: "crop is added successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "crop adding is failed" });
  }
});

app.get("/api/crops", async (req, res) => {
  try {
    const db = client.db("Harvest-hub");
    const cropsCollection = db.collection("crop-data");

    const crops = await cropsCollection.find().toArray();

    const cropsWithBase64Images = crops.map((crop) => {
      if (crop.file) {
        // Decode Base64 string from file field
        const decodedImage = Buffer.from(crop.file, "base64");

        // Convert decoded image to Base64 again
        const base64Image = decodedImage.toString("base64");

        return { ...crop, imageBase64: base64Image };
      } else {
        // If file field is empty or undefined, return crop without modification
        return crop;
      }
    });
    console.log(cropsWithBase64Images);
    res.json(cropsWithBase64Images);
  } catch (error) {
    console.error("Error fetching crops with images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/submit-cart", async (req, res) => {
  try {
    const { cart } = req.body; // Extract cart data from request body

    // Check if the cart array is empty
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }

    const db = client.db("Harvest-hub");
    const cartCollection = db.collection("cart-items"); // Assuming you have a collection named 'cart' in your database

    // Iterate over each crop item in the cart array
    for (const item of cart) {
      // Extract cropName and quantity from the current item
      const { cropName, quantity, productId } = item;
      const cropCollection = db.collection("crop-data");
      console.log(productId);
      console.log(quantity);
      const objectId2 = new ObjectId(productId);

      const result = await cropCollection.updateOne(
        { _id: objectId2 },
        { $inc: { quantity: -quantity } }
      );

      // Check if the update operation was successful
      if (result.modifiedCount === 0) {
        console.log("error");
        throw new Error(
          `Failed to update quantity for product with ID ${productId}`
        );
      }
      // Insert cropName and quantity into database collection
      await cartCollection.insertOne({ cropName, quantity });
    }

    res.status(200).json({ message: "Cart data saved successfully" });
  } catch (error) {
    console.error("Error saving cart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port: 3001`);
});
