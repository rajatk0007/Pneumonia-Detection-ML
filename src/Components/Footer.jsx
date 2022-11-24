import React, { useState } from "react";
import "./Navbar.css";
import axios from 'axios';
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
function Footer() {
  const PatientDetails = {
    FirstName: "",
    LastName: "",
    DOB: "",
    Gender: "Female",
    Phone: "",
  };
  const [PatientRegistration, setUserRegistration] = useState(PatientDetails);
  const [FileUpload, FileuploadComplete] = useState('');

  // handler for handling the patients details
  const handleinput = (e) => {
    const { name, value } = e.target;
    setUserRegistration({ ...PatientRegistration, [name]: value });
  };

  // image handler for patient record
  const handleimagechange = (event) => {
    FileuploadComplete(URL.createObjectURL(event.target.files[0]));
  };
  const formsubmithandler=(e)=>{
    e.preventDefault();
    const finalobject=PatientRegistration;
    finalobject["ObservationImage"]=FileUpload;
    console.log(finalobject);
     axios.post()
     .then((result)=>{
      //access the results here
     }) 
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
                  <input type="file" className="form-control" id="customFile" onChange={handleimagechange}/>
                  <div className="small text-muted mt-2">
                    Upload your X-Ray Image in .jpg, .png, .jpeg{" "}
                  </div>
                  <label>{FileUpload}</label>
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
