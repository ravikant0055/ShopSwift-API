const { User } = require('../model/User');
const model = require('../model/Wishlist');
const Wishlist = model.Wishlist;

const handleSuccess = (res, data, message) => {
    return res.status(200).json({ success: true, data, message });
};

const handleFailure = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({ success: false, message, error });
};

exports.getUserWishlist = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);

        const wishlist = await Wishlist.findOne({ userId }).populate('products');

        if (wishlist) {
            return handleSuccess(res, wishlist, 'Wishlist for the given userId.');
        }

        return handleFailure(res, 'No products in wishlist.', 400);
    } catch (err) {
        return handleFailure(res, 'Failed to fetch wishlist.', 500, err.message);
    }
};

exports.addWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const existingWishlist = await Wishlist.findOne({ userId });

        if (existingWishlist?.products.includes(productId)) {
            return handleFailure(res, 'Already in wishlist', 400);
        }

        if (existingWishlist) {
            const updatedWishlist = await Wishlist.findOneAndUpdate(
                { userId },
                { $push: { products: productId } },
                { new: true }
            ).populate('products');

            return handleSuccess(res, updatedWishlist, 'Added to existing wishlist.');
        } else {
            const user = await User.findOne({ userId });

            if (!user) {
                const newWishlist = await Wishlist.create({ userId, products: [productId] });
                return handleSuccess(res, newWishlist, 'Added to wishlist.');
            }

            return handleFailure(res, 'No user exists.', 403);
        }
    } catch (err) {
        return handleFailure(res, 'Failed to add wishlist.', 500, err.message);
    }
};

exports.removeProductFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const existingWishlist = await Wishlist.findOne({ userId });

        if (!existingWishlist?.products.includes(productId)) {
            return handleFailure(res, 'Not exist in wishlist', 400);
        }

        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { $pull: { products: productId } },
            { new: true }
        );

        if (updatedWishlist) {
            return handleSuccess(res, updatedWishlist, 'Product is removed from wishlist.');
        } else {
            return handleFailure(res, 'Unable to find wishlist', 401);
        }
    } catch (err) {
        return handleFailure(res, 'Unable to find wishlist', 500, err.message);
    }
};
