const express = require('express');
const router = express.Router();
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cart.controller');

const protect = require('../middleware/authMiddleware');

router.get('/', protect, getUserCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateCartItem);
router.delete('/:productId', protect, removeCartItem);

module.exports = router;