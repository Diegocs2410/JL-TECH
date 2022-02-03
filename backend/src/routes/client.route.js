const {
  getAll,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");
const router = require("express").Router();

router.route("/").get(getAll).post(createClient);

router.route("/:id").get(getClient).put(updateClient).delete(deleteClient);

module.exports = router;
