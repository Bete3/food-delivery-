import Order from '../models/Order.js';


export const createOrder = async (req, res) => {
  try {
    const { name, number, amount, address, image, foodName, foodImage } = req.body;

    const lastOrder = await Order.findOne().sort({
      orderNumber: -1,
    });

    const nextOrderNumber = lastOrder
      ? lastOrder.orderNumber + 1
      : 1;

    const order = await Order.create({
      orderNumber: nextOrderNumber,
      name,
      number,
      amount,
      address,
      image,
      foodName,
        foodImage,
        status: 'Pending',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};