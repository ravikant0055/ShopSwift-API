const express = require("express")
const router = express.Router();

const orderController = require("../controller/orderController");

router.get('/order/:userId', orderController.getAllOrders);
router.post("/order/:userId", orderController.addUserOrder)

exports.routes = router;