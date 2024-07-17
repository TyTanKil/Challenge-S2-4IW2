const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({ filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'upload de fichier" });
  }
});

module.exports = router;
