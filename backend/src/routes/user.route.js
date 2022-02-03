const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/user.controller");
const uploadImg = require("../middlewares/uploadImg");
// Routes
router.route("/").get(getAllUsers).post(uploadImg.single("avatar"), createUser);
router
  .route("/:id")
  .get(getUserById)
  .delete(deleteUser)
  .put(uploadImg.single("avatar"), updateUser);

// login route
router.route("/login").post(loginUser);

module.exports = router;
