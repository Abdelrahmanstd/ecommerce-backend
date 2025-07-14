const Order = require('../models/order.model');
const Cart = require('../models/cart.model');


const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalPrice,
    });

   
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id ,isDeleted:false}).populate('items.product');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({isDeleted:false}).populate('user').populate('items.product');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status || order.status;
    const updated = await order.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder=async(req,res)=>{

  try {
    const order=await Order.findById(req.params.id)
    if(!order) return  res.status(404).json({ message: 'Order not found' })

    order.isDeleted=true
    await order.save()
    res.status(200).json({ message: 'Order soft deleted successfully' })      
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports={
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
}