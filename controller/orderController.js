const { Order } = require("../model/Order");

const handleSuccess = (res, data, message) => {
    return res.status(200).json({ success: true, data, message });
};

const handleFailure = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({ success: false, message, error });
};

exports.getAllOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate("items.product");

        if (orders.length > 0) {
            return handleSuccess(res, orders, "Orders for given userId.");
        }

        return handleFailure(res, "No orders exist for the given userId.", 404);
    } catch (err) {
        return handleFailure(res, "Failed to fetch orders.", 500, err.message);
    }
};

exports.addUserOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { items, totalPrice } = req.body;

        const newOrder = await Order.create({ userId, items, totalPrice });
        const populatedOrder = await Order.findById(newOrder._id).populate("items.product");

        return handleSuccess(res, populatedOrder, "Order Placed.");
    } catch (err) {
        return handleFailure(res, "Failed to place order.", 500, err.message);
    }
};
