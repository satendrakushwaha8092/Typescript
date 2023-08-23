const userModel = require('../models/user.model')

exports.create= (req, res) => {

}

exports.getUserData= async (req, res) => {
    const result = await userModel.find({$and:[{otp:{$gt:1}},{otp:{$lt:2000}}]})
    res.send(result)
}