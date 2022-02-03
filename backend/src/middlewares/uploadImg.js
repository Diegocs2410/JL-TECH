const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Function para crear carpeta en donde guardaremos los datos
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public"),
  filename: (req, file, cb) =>
    cb(null, uuidv4() + path.extname(file.originalname.toLocaleLowerCase())),
});

// Funcion para revisar si recibimo el archivo para verificar la extension

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp|SVG|JPG|JPEG/; // Aca tenemos los tipos de archivos permitidos
    const mimetype = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extName) return cb(null, true);
    else cb("Error: El archivo debe ser jpeg|jpg|png|gif|");
  },
});

module.exports = upload;
