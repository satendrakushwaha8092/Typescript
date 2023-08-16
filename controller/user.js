const db=require('../models/index')

exports.create=async (req,res)=>{
    console.log(req.body)
    const result=await db.user.create(req.body)
    res.status(201).send(result)
}

exports.login=async (req,res)=>{
    const result=await db.user.findOne({email:req.body.email,password:req.body.password})
    if(result){
    res.status(200).send("success")
    }else{
    res.status(404).send("error")
    }
}

exports.get=async (req,res)=>{
    const result=await db.user.findAll().then((res)=>console(res))
    res.send(result)
}

exports.getUserById=async (req,res)=>{
    const result=await db.user.findOne({where:req.params.where})
    res.send(result)
}

exports.deleteData=async (req,res)=>{
    try{
    const result=await db.user.destroy({where:{id:req.params.id}})
    return res.send({resule:result})
    }catch(err){
        console.log(err)
    }
}
