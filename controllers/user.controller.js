const userModel = require('../models/user.model')

exports.create= (req, res) => {

}

exports.getUserData= async (req, res) => {
    const result = await userModel.find()
    res.send(result)
}

exports.createUserData= async (req, res) => {
    const result = await userModel.create(req.body)
    res.send(result)
}