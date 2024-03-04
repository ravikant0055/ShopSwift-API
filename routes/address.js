const express =  require('express');
const addressRouter = express.Router();

const addressController = require('../controller/address')

addressRouter
.get("/", addressController.getAllAddresses)

.post("/addAddress", addressController.addAddress)

.patch("/updateAddress/:address_id", addressController.updateAddress)

.delete("/deleteAddress/:address_id" ,addressController.deleteAddress)

exports.routes = addressRouter;