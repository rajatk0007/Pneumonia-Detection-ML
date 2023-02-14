const express=require("express");
const app=express();
const multer=require("multer");
const AWS=require('aws-sdk');
const cors=require("cors");
require("./database/connection");
const Patients=require("./models/Patients");
const bodyParser = require('body-parser');
const bucketName='pneumonia-test-bucket';
const bucketRegion='ap-south-1';
const accessKey='AKIAQ4ALCGDM72DUQS7C';
const secretAccessKey='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';
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const s3=new AWS.S3({
  accessKeyId:accessKey,
  secretAccessKey:secretAccessKey
})
const storage=multer.memoryStorage();
const upload=multer({storage:storage});


app.post('/upload',upload.single('ObservationImage'),async(req,res)=> {
  const FinalObject=JSON.parse(req.body.PatientDetails);
  const params={
    Bucket:bucketName,
    Key:FinalObject['FirstName'],
    Body:req.file.buffer,
    ContentType:req.file.mimetype,
  }
  s3.upload(params,async(err,data)=>{
    try{
      FinalObject['ReportPhoto']=data.Location;
      const Patient=new Patients(FinalObject);
      await Patient.save()
        res.send(Patient).status(201);
    }
    catch(err){
      res.send(err).status(400);
    }
  })
})

app.listen(8000,()=>{
  console.log("listen at 8000")
})

