const orderModel = require('../models/order.model')

exports.create= (req, res) => {

}

exports.getOrderData= async (req, res) => {
    //const result = await orderModel.find()

    const result = await orderModel.aggregate([
        // {
        //     $match: {
        //       amount: 400
        //     }
        //   },

        //  {
        //     $group: { _id: "$item", total: { $sum: "$amount" }}
        //  },
        //  {
        //     $count: "monitor"
        //   }
        {
        "$lookup": {
            "from": "users",
            "localField": "customerId",
            "foreignField": "_id",
            "as": "customerData"
          }
    }
])
    res.send(result)
}

exports.createOrderData= async (req, res) => {
    try{
    const result = await orderModel.create(req.body)
    res.send(result)
    }catch(err){
        res.send(err.message)
    }
}

exports.updateOrderData= async (req, res) => {
    try{
    const result = await orderModel.findOneAndUpdate({_id:"64e5cf738f84560a9a9abea2"},req.body,{new:true})
    res.send(result)
    }catch(err){
        res.send(err.message)
    }
}