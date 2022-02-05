const {
  getAll,
  getClient,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/client.controller')
const verifyToken = require('../middlewares/verifyJWT')
const router = require('express').Router()

router.route('/').get(verifyToken, getAll).post(verifyToken, createClient)

router
  .route('/:id')
  .get(verifyToken, getClient)
  .put(verifyToken, updateClient)
  .delete(verifyToken, deleteClient)

module.exports = router
