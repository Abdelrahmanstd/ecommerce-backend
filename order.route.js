const express = require('express');
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post('/', protect, createOrder); 
router.get('/myorders', protect, getMyOrders); 

// Admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
