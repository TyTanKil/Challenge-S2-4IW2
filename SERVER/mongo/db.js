const mongoose = require("mongoose");

const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb://root:password@mongo:27017/app?authSource=admin";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// const mongoose = require("mongoose");

// const mongoUrl =
//   process.env.MONGO_URL ||
//   "mongodb://root:password@mongo:27017/app?authSource=admin";

// // Définir un schéma et un modèle pour vos données
// const testSchema = new mongoose.Schema({
//   name: String,
//   value: Number,
// });

// const TestModel = mongoose.model("Test", testSchema);

// async function insertData() {
//   try {
//     await mongoose.connect(mongoUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");

//     // Insérer des données
//     const testData = new TestModel({ name: "Test", value: 42 });
//     await testData.save();

//     console.log("Data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// insertData();
