const express = require("express");
const cookieParser = require("cookie-parser");
const AccountRouter = require("./routes/account");
const SecurityRouter = require("./routes/security");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')

//function parseBody(req, res, next) {
//  const data = [];
//  req.on("data", (chunk) => {
//    data.push(chunk);
//  });
//  req.on("end", () => {
//    const buffer = Buffer.concat(data);
//    const body = buffer.toString();
//    try {
//      const bodyParsed = JSON.parse(body);
//      req.body = bodyParsed;
//      next();
//    } catch (e) {
//      return res.sendStatus(400);
//    }
//  });
//}

//app.use(parseBody);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.get("/", (req, res, next) => {
    const product1 = new mongoose.models.product({
        id: "1",
        manufacturer: {label: "manufacturer1"},
        category: {label: "category1"},
        ref: "ref1",
        label: "label1",
        unit_price: 1,
        description: "description1",
        images: [{content: "content1", order: 1}],
        details: [{detail: {label: "label1", type: "type1", group: "group1"}, value: "value1"}],
        stock: {quantity: 1}
    });
    product1.saveToDB();
    res.send("Coucou " + JSON.stringify(req.query));
});

app.post("/", (req, res, next) => {
    res.send("Coucou FROM POST " + JSON.stringify(req.body));
});

app.use("/accounts", AccountRouter);
app.use(SecurityRouter);
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});