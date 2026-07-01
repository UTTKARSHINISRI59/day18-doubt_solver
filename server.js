const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const chatRoutes=require("./routes/chatRoutes");

dotenv.config();

const app=express();

connectDB();

app.use(cors());//kuch hi log access kr paayenge due to this(allowing to resoures to some specific only)(brower safety bhi rhti h)
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("student doubt solver api is running");
})

app.use("/api",chatRoutes);

const PORT=process.env.PORT||5001;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost: ${PORT}`)
});

