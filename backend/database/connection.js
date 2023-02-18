const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
// mongodb://localhost:27017
//mongodb://localhost:27017
mongoose.connect("mongodb://127.0.0.1:27017/patientrecord",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log("connection has been established");
})
.catch((err)=>{
    console.log(`error being ${err}`);
})  