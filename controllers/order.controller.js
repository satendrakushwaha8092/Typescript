const orderModel = require("../models/order.model");

exports.create = (req, res) => {};

exports.getOrderData = async (req, res) => {
  //const result = await orderModel.find()

  const result = await orderModel.aggregate([
    // {
    //   $addFields: {
    //     product: "$item",
    //   },
    // },

    //   {
    //     $project: {
    //       _id: 0,
    //       customerId: "$_id",
    //       name: "$customerData.name",
    //       age: "$customerData.age",
    //       totalAmount: 1
    //     }
    //   },

    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customerData",
      },
    },
    // {
    //   $project: {
    //     _id: 0,
    //     updatedAt: 0,
    //     createdAt: 0,
    //     __v: 0,
    //   },
    // },
    {
      $unwind: "$customerData",
    },
    {
        $project: {
          _id: 0,
          customerId: "$_id",
          name: "$customerData.name",
          age: "$customerData.age",
          totalAmount: 1
        }
      }
  ]);
  res.send({ data: result });
};

exports.createOrderData = async (req, res) => {
  try {
    const result = await orderModel.create(req.body);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};

exports.updateOrderData = async (req, res) => {
  try {
    const result = await orderModel.findOneAndUpdate(
      { _id: "64e5cf738f84560a9a9abea2" },
      req.body,
      { new: true }
    );
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
};
