import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    foodName: {
  type: String,
  required: true,
},

foodImage: {
  type: String,
  required: true,
},

    name: {
      type: String,
      required: true,
    },

    number: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;