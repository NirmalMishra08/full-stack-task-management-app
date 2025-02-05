import userModel from "../Model/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();
export  async function register(req: any, res: any) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "Please provide username and password" });
        }
        const user = await userModel.findOne({ username: username })
        if (user) {
            return res.status(400).json({ msg: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ username: username, password: hashedPassword });
       res.status(200).json({message:"User Successfully registered",newUser})
    }catch(err){
        return res.status(400).json({message:"Error occurred while : "+((err)as Error).message})
    }
   

} 

export  async function login(req:any,res:any){
    try {
        const {username,password}= req.body;
        if(!username||!password){
            return res.status(400).json({msg:"Please provide username and password"});
        }
        const user = await userModel.findOne({username: username})
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credentials"});
        }
        const token  = jwt.sign({userId:user._id},process.env.SECRET_KEY as string,{expiresIn:"1h"})
       return res.status(200).json({msg:"User authenticated successfully",user,token})
    } catch (error) {
        return res.status(400).json({message:"Error occurred while"+((error)as Error).message})
    }
   
}