const schemaModel = require('../models/schema')

const getUserInfo = async(req,res) =>{
    try{
        const userId = req.params.id;
        const user = await schemaModel.UserModel.findById(userId)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).json(product)
    }catch(e){
        /* res.status(500).json({message:e.message}) */
        console.log(e.message)
    }
}

const upDateUserInfor = async(req,res) =>{
    try{
        const userId = req.params.id;
        const userInfo = await schemaModel.UserModel.findById(userId)
        res.status(200).json(product)
    }catch(e){
        /* res.status(500).json({message:e.message}) */
        console.log(e.message)
    }
}



/* const UserSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true  },
    preference: { type: String, lowercase: true },
    createDate: { type: Date, default: Date.now },
  });
 */