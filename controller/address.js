const model  = require('../model/address');
const { Product } = require('../model/product');

const Address = model.Address;


exports.getAllAddresses=async(req,res)=>{
    try{
        const address = await Address.find();
        res.json(address);
    }catch(err){
        res.status(400).json("Bad Request...")
    }
}

exports.addAddress= async(req,res)=>{
    try{
        const existingAdd  = await Address.findOne({address_id : req.body.address_id})
        
        if(existingAdd){
            return res.status(400).json("Already Exist . Try with new Addess");
        }
        const address = new Address(req.body);
        await address.save().then(()=>{
            res.status(200).json("Address Added successfully!");
        })
    }catch(err){
          res.status(200).json(err);  
    }
}
    exports.updateAddress = async(req,res)=>{
        try{
            await Address.findOneAndUpdate(
                { address_id: req.params.address_id },
      req.body,
      { new: true }
            )
            res.status(200).json("Address Updated Successfully!")
        }
    catch(err){
        res.status(400).json("Can not update .Try Again with")    }
}


exports.deleteAddress = async(req,res)=>{
    try{
        await Address.findOneAndDelete({address_id: req.params.address_id}, {new:true})
        res.status(200).json("Address Deleted Successfully!")

    }catch(err){
        res.status(400).json("Can not delete . Try again!")
    }
}

   
