const mongoose=require("mongoose");
mongoose.set("strictQuery",false);

mongoose.connect("mongodb://localhost:27017/patientrecord")
.then(()=>{
    console.log("connection has been established");
})
.catch((err)=>{
    console.log(`error being ${err}`);
})  