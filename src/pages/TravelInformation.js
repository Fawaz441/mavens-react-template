import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../components/TextError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/utils/auth";

const defaults = {
  name: "",
  address1: "",
  address2: "",
  apartmentNumber: "",
  city: "",
  state: "",
  countryCode: "",
  phoneNumber: "",
};

function TravelInformation() {
  const [formDetails, setFormDetails] = useState({ ...defaults });
  const [emergencyDetails, setEmergencyDetails] = useState({
    familyName: "",
    firstName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    select: "",
    select2: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const initialValues = {
    name: formDetails.name,
    address1: formDetails.address1,
    address2: formDetails.address2,
    apartmentNumber: formDetails.apartmentNumber,
    city: formDetails.city,
    state: formDetails.state,
    countryCode: formDetails.countryCode,
    phoneNumber: formDetails.phoneNumber,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("US Point of Contact is a required field."),
    address1: Yup.string().required("Address Line 1 is a required field."),
    city: Yup.string().required("City is a required field."),
    state: Yup.string().required("State is a required field."),
    phoneNumber: Yup.string().required(
      "Birth Country Code and Phone Number must be provided."
    ),
  });

  const onChange = (e) => {
    setFormDetails((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeEmergency = (e) => {
    setEmergencyDetails((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setFormDetails(auth.formThree);
    setEmergencyDetails(auth.formThreeEmergency);
    // eslint-disable-next-line
  }, []);
  const handleNext = (e) => {
    e.preventDefault();
    if (emergencyDetails.select === "yes") {
      if (
        formDetails.name === "" ||
        formDetails.address1 === "" ||
        formDetails.city === "" ||
        formDetails.state === "" ||
        formDetails.phoneNumber === ""
      ) {
        alert("Fill All U.S Contact Information");
      }
    }
    if (
      emergencyDetails.countryCode !== "" &&
      emergencyDetails.email !== "" &&
      emergencyDetails.familyName !== "" &&
      emergencyDetails.firstName !== "" &&
      emergencyDetails.phoneNumber !== ""
    ) {
      auth.setFormThree(formDetails);
      auth.setFormThreeEmergency(emergencyDetails);
      navigate("/eligibility");
    } else {
      alert("Fill All Emergency Contact Information");
    }
  };

  return (
    <div className="w-[60%] mx-auto">
      <div className="my-4">
        <h2 className="text-lg text-indigo-800">ENTER TRAVEL INFORMATION</h2>
        <h5 className="text-[12px]">Please provide all responses in English</h5>
        <h5 className="text-[12px] font-bold text-[#cf1b1b]">
          Required fields are indicated by a red asterisk *.
        </h5>
        <div className="flex justify-between">
          <h3 className="text-[12px]">
            Is your travel to the US occuring in transit to another country?
            <span className="text-[#cf1b1b]">*</span>
          </h3>
          <select
            name="select"
            value={emergencyDetails.select}
            onChange={onChangeEmergency}
            className="text-[12px]"
          >
            <option value="">--Please Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      {emergencyDetails.select === "yes" && (
        <div className="my-6">
          <h2 className="text-lg text-indigo-800">
            U.S. POINT OF CONTACT INFORMATION
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleNext}
          >
            {(formik) => (
              <Form onChange={onChange}>
                <Field
                  name="name"
                  value={formDetails.name}
                  placeholder="Name*"
                  className="outline-none text-[12px] w-full my-3"
                />
                <hr />
                <ErrorMessage name="name" component={TextError} />
                <div className="flex justify-between">
                  <div className="w-[30%]">
                    <Field
                      name="address1"
                      value={formDetails.address1}
                      placeholder="Address Line 1*"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                    <ErrorMessage name="address1" component={TextError} />
                  </div>
                  <div className="w-[30%]">
                    <Field
                      name="address2"
                      value={formDetails.address2}
                      placeholder="Address Line 2"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                  </div>
                  <div className="w-[30%]">
                    <Field
                      name="apartmentNumber"
                      value={formDetails.apartmentNumber}
                      placeholder="Apartment Number"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="mr-11 w-[30%]">
                    <Field
                      name="city"
                      value={formDetails.city}
                      placeholder="City*"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                    <ErrorMessage name="city" component={TextError} />
                  </div>
                  <div className="w-[30%]">
                    <Field
                      name="state"
                      value={formDetails.state}
                      placeholder="State*"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                    <ErrorMessage name="state" component={TextError} />
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="mr-11 w-[30%]">
                    <Field
                      name="countryCode"
                      value={formDetails.countryCode}
                      placeholder="Country Code*"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                    <ErrorMessage name="countryCode" component={TextError} />
                  </div>
                  <div className="w-[30%]">
                    <Field
                      name="phoneNumber"
                      value={formDetails.phoneNumber}
                      placeholder="Phone Number*"
                      className="outline-none text-[12px] w-full my-3"
                    />
                    <hr />
                    <ErrorMessage name="phoneNumber" component={TextError} />
                  </div>
                </div>
                <h2 className="mt-6 text-lg text-indigo-800">
                  ADDRESS WHILE IN THE US
                </h2>
                <p className="text-[12px]">
                  The address where you will be staying in the U.S is optional
                  to complete the application. If multiple locations are
                  planned, enter the first address. If the complete address is
                  not known, write the name of the hotel or locations you will
                  visit.
                </p>
                <div className="mt-4 flex justify-between">
                  <p className="text-[10px]">
                    Is your Address While in the U.S. same as the U.S. Point of
                    Contact Address listed above?
                  </p>
                  <select
                    name="select2"
                    onChange={onChangeEmergency}
                    className="text-[10px]"
                  >
                    <option value="">--Please Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {emergencyDetails.select2 === "no" && (
                  <div>
                    <div className="flex justify-between">
                      <div className="w-[30%]">
                        <Field
                          name="address1-2"
                          placeholder="Address Line 1"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                      </div>
                      <div className="w-[30%]">
                        <Field
                          name="address2-2"
                          placeholder="Address Line 2"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                      </div>
                      <div className="w-[30%]">
                        <Field
                          name="apartmentNumber2"
                          placeholder="Apartment Number"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="mr-11 w-[30%]">
                        <Field
                          name="city2"
                          placeholder="City"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                      </div>
                      <div className="w-[30%]">
                        <Field
                          name="state2"
                          placeholder="State"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div className="mt-6">
        <h2 className="uppercase text-lg text-indigo-800 mb-4">
          Emergency contact information in or out of the u.s
        </h2>
        <div className="flex flex-wrap">
          <div className="w-[30%] mr-8">
            <input
              name="familyName"
              placeholder="Family Name*"
              className="outline-none text-[12px] my-3"
              value={emergencyDetails.familyName}
              onChange={onChangeEmergency}
            />
            <hr />
          </div>
          <div className="w-[30%] mr-8">
            <input
              name="firstName"
              placeholder="First (Given) Name*"
              className="outline-none text-[12px] my-3"
              value={emergencyDetails.firstName}
              onChange={onChangeEmergency}
            />
            <hr />
          </div>
          <div className="w-[30%]">
            <input
              name="email"
              type="email"
              placeholder="Email Address*"
              className="outline-none text-[12px] my-3"
              value={emergencyDetails.email}
              onChange={onChangeEmergency}
            />
            <hr />
          </div>
          <div className="w-[30%] mr-8">
            <input
              name="countryCode"
              placeholder="Country Code*"
              className="outline-none text-[12px] my-3"
              value={emergencyDetails.countryCode}
              onChange={onChangeEmergency}
            />
            <hr />
          </div>
          <div className="w-[30%]">
            <input
              name="phoneNumber"
              placeholder="Phone Number*"
              className="outline-none text-[12px] my-3"
              value={emergencyDetails.phoneNumber}
              onChange={onChangeEmergency}
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between my-6">
        <a href="/" className="px-6 py-2 rounded border border-gray-300">
          SAVE AND EXIT
        </a>
        <h3 className="font-bold text-sm">Step 4 of 7</h3>
        <button
          onClick={() => {
            navigate("/personal-information");
          }}
          className="px-12 py-2 rounded border border-gray-300"
        >
          PREVIOUS
        </button>
        <button
          onClick={handleNext}
          className="px-16 py-2 rounded border border-cyan-700 bg-cyan-700 text-white"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default TravelInformation;
