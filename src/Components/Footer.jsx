import React, { useState } from "react";
import "./Navbar.css";
import SpinnerWidget from "./SpinnerWidget";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import axios from "axios";
function Footer() {
  const PatientDetails = {
    FirstName: "",
    LastName: "",
    DOB: "",
    Gender: "Male",
    Phone: "",
  };
  // const BASEURL="https://pneumonia-webapp-backend.herokuapp.com/predict"
  const BASEURL="http://localhost:8000/upload"
  const [PatientRegistration, setUserRegistration] = useState(PatientDetails);
  const [FileUpload, SetFileuploadComplete] = useState();

  // handler for handling the patients details
  const handleinput = (e) => {
    const { name, value } = e.target;
    setUserRegistration({ ...PatientRegistration, [name]: value });
  };
  
  // image handler for patient record
  const handleimagechange = (event) => {
    if (event.target.files && event.target.files[0]) {
      SetFileuploadComplete(event.target.files[0])
    }
  };
  const formsubmithandler=async(e)=>{
    e.preventDefault();
    if(!FileUpload){
      alert('Please Select the Image for Prediction')
    }
    else
   { 
    const finalobject=PatientRegistration;
    console.log(FileUpload);
    const json=JSON.stringify(finalobject);
    const formdata=new FormData();
    formdata.append('PatientDetails',json)
    formdata.append('ObservationImage',FileUpload);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };
    try {
      const result=await axios.post(BASEURL,formdata,config);
      console.log(result.data);
    }
    catch(err){
      alert(`err message is ${err}`)
    }
}
  }
  return (
    <div className="">
      <MDBContainer>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Patient Details
              </h3>

              <MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    name="FirstName"
                    size="lg"
                    id="form1"
                    type="text"
                    value={PatientRegistration.FirstName}
                    onChange={handleinput}
                  />
                </MDBCol>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last Name"
                      name="LastName"
                      size="lg"
                      id="form2"
                      type="text"
                      value={PatientRegistration.LastName}
                      onChange={handleinput}
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <SpinnerWidget name="Running"/>
                  </MDBCol>
                </MDBRow>
              </MDBCol>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="DOB"
                    name="DOB"
                    size="lg"
                    id="form3"
                    type="text"
                    value={PatientRegistration.DOB}
                    onChange={handleinput}
                  />
                </MDBCol>

                <MDBCol md="6" className="mb-4">
                  <h6 className="fw-bold">Gender: </h6>
                  <MDBRadio
                    id="inlineRadio1"
                    label="Female"
                    name="Gender"
                    value="Female"
                    checked={PatientRegistration.Gender === "Female"}
                    onChange={handleinput}
                    inline
                  />
                  <MDBRadio
                    id="inlineRadio2"
                    name="Gender"
                    label="Male"
                    value="Male"
                    checked={PatientRegistration.Gender === "Male"}
                    onChange={handleinput}
                    inline
                  />
                  <MDBRadio
                    id="inlineRadio3"
                    label="Other"
                    name="Gender"
                    value="Other"
                    checked={PatientRegistration.Gender === "Other"}
                    onChange={handleinput}
                    inline
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone"
                    name="Phone"
                    size="lg"
                    id="form5"
                    type="rel"
                    onChange={handleinput}
                    value={PatientRegistration.Phone}
                  />
                </MDBCol>
                <MDBCol md="9" className="pe-5">
                  <input type="file" className="form-control" id="customFile" onChange={handleimagechange} accept='.jpg,.jpeg,.png'/>
                  <div className="small text-muted mt-2">
                    Upload your X-Ray Image in .jpg, .png, .jpeg{" "}
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBBtn className="mb-4" size="lg" onClick={formsubmithandler}>
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Footer;
