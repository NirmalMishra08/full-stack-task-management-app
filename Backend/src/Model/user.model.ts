import mongoose  from "mongoose";

interface IUser  {
    username:string,
    password:string
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type:String, required: true,unique:true},
    password:{ type:String, required: true}
})

export default mongoose.model("User", UserSchema);