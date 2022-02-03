const path = require("path");
const fs = require("fs");

const { promisify } = require("util");

// Funtion to delete image
const delImg = async (imgPath) => {
  const unlink = promisify(fs.unlink);
  try {
    await unlink(path.resolve(__dirname, "../public", imgPath));
  } catch (err) {
    console.log(err);
  }
};

module.exports = delImg;
