const asyncWrapper = require("../helpers/asyncWrapper");
const { messageGeneral } = require("../helpers/messages");
const ClientModel = require("../models/client.model");

const clientController = {};

clientController.getAll = asyncWrapper(async (req, res) => {
  const clients = await ClientModel.find();
  messageGeneral(res, 200, true, clients, "Clients retrieved successfully");
});

clientController.getClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const client = await ClientModel.findById(id);
  client
    ? messageGeneral(res, 200, true, client, "Client retrieved successfully")
    : messageGeneral(res, 404, false, null, "Client not found");
});

clientController.createClient = asyncWrapper(async (req, res) => {
  const { name, email, contact } = req.body;
  const client = await ClientModel.findOne({ email });
  if (client)
    return messageGeneral(res, 400, false, null, "Client already exists");
  const newClient = new ClientModel({ name, email, contact });
  await newClient.save();
  messageGeneral(res, 201, true, newClient, "Client created successfully");
});

clientController.deleteClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const client = await ClientModel.findById(id);
  client
    ? await ClientModel.findByIdAndDelete(id)
    : messageGeneral(res, 404, false, null, "Client not found");
  messageGeneral(res, 200, true, null, "Client deleted successfully");
});

clientController.updateClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const client = await ClientModel.findById(id);

  const updatedClient = {
    name: name || client.name,
    email: email || client.email,
    contact: contact || client.contact,
  };
  const clientUPD = await ClientModel.findByIdAndUpdate(id, updatedClient, {
    new: true,
  });
  messageGeneral(res, 200, true, clientUPD, "Client updated successfully");
});

module.exports = clientController;
