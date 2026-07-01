const mongoose =require("mongoose");

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    }
    catch(err){
        console.log("unable to connect",err);
    }
}
module.exports=connectDB;
