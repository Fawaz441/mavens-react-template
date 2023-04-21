import React, { useState, useEffect } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/utils/auth";

const defaults = {
  firstNameAliases: "",
  familyNameAliases: "",
  firstNamePassport: "",
  documentType: "",
  documentNumber: "",
  expiryDate: "",
  address1: "",
  address2: "",
  address3: "",
  city: "",
  state: "",
  country: "",
  countryCode: "",
  phoneNumber: "",
  telephoneType: "",
  firstNameParentsOne: "",
  firstNameParentsTwo: "",
  familyNameParentsOne: "",
  familyNameParentsTwo: "",
  facebookId: "",
  linkedInId: "",
  twitterId: "",
  instagramId: "",
  platform: "",
  socialMedia: "",
};

function PersonalInformation() {
  const [formTwoOthers, setFormTwoOthers] = useState({
    issuedPassport: "",
    aliases: "",
    cbp: "",
    previousEmployer: "",
    jobTitle: "",
    address1: "",
    employerName: "",
    address2: "",
    phoneNumber: "",
  });

  const [personalInfo, setPersonalInfo] = useState({ ...defaults });
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setFormTwoOthers(auth.formTwoOthers);
    setPersonalInfo(auth.formTwo);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setPersonalInfo((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtherChange = (e) => {
    setFormTwoOthers({ ...formTwoOthers, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formTwoOthers.aliases === "" || formTwoOthers.issuedPassport === "") {
      alert("Select answers for the appropriate Questions");
    } else if (
      formTwoOthers.aliases === "yes" &&
      formTwoOthers.issuedPassport === "yes"
    ) {
      if (
        personalInfo.firstNameAliases !== "" &&
        personalInfo.familyNameAliases !== "" &&
        personalInfo.firstNamePassport !== "" &&
        personalInfo.documentType !== "" &&
        personalInfo.documentNumber !== "" &&
        personalInfo.expiryDate !== ""
      ) {
        if (
          personalInfo.address1 !== undefined &&
          personalInfo.city !== undefined &&
          personalInfo.country !== undefined &&
          personalInfo.state !== undefined &&
          personalInfo.countryCode !== undefined &&
          personalInfo.telephoneType !== undefined &&
          personalInfo.phoneNumber !== undefined &&
          personalInfo.firstNameParentsOne !== undefined &&
          personalInfo.firstNameParentsTwo !== undefined &&
          personalInfo.familyNameParentsOne !== undefined &&
          personalInfo.familyNameParentsTwo !== undefined &&
          formTwoOthers.cbp !== undefined &&
          formTwoOthers.previousEmployer !== undefined
        ) {
          auth.setFormTwo(personalInfo);
          auth.setFormTwoOthers(formTwoOthers);
          navigate("/travel-information");
        } else {
          alert("Fill all required details");
        }
      }
    } else if (
      formTwoOthers.aliases === "no" &&
      formTwoOthers.issuedPassport === "no"
    ) {
      if (
        personalInfo.address1 !== undefined &&
        personalInfo.city !== undefined &&
        personalInfo.country !== undefined &&
        personalInfo.state !== undefined &&
        personalInfo.countryCode !== undefined &&
        personalInfo.telephoneType !== undefined &&
        personalInfo.phoneNumber !== undefined &&
        personalInfo.firstNameParentsOne !== undefined &&
        personalInfo.firstNameParentsTwo !== undefined &&
        personalInfo.familyNameParentsOne !== undefined &&
        personalInfo.familyNameParentsTwo !== undefined &&
        formTwoOthers.cbp !== undefined &&
        formTwoOthers.previousEmployer !== undefined
      ) {
        auth.setFormTwo(personalInfo);
        auth.setFormTwoOthers(formTwoOthers);
        navigate("/travel-information");
      } else {
        alert("Fill all required details");
      }
    } else if (
      formTwoOthers.issuedPassport === "yes" &&
      formTwoOthers.aliases === "no"
    ) {
      if (
        personalInfo.firstNamePassport === "" ||
        personalInfo.documentNumber === "" ||
        personalInfo.documentType === "" ||
        personalInfo.expiryDate === ""
      ) {
        alert("Fill First Name and Family Name for the passport field");
      } else {
        if (
          personalInfo.address1 !== undefined &&
          personalInfo.city !== undefined &&
          personalInfo.country !== undefined &&
          personalInfo.state !== undefined &&
          personalInfo.countryCode !== undefined &&
          personalInfo.telephoneType !== undefined &&
          personalInfo.phoneNumber !== undefined &&
          personalInfo.firstNameParentsOne !== undefined &&
          personalInfo.firstNameParentsTwo !== undefined &&
          personalInfo.familyNameParentsOne !== undefined &&
          personalInfo.familyNameParentsTwo !== undefined &&
          formTwoOthers.cbp !== undefined &&
          formTwoOthers.previousEmployer !== undefined
        ) {
          auth.setFormTwo(personalInfo);
          auth.setFormTwoOthers(formTwoOthers);
          navigate("/travel-information");
        } else {
          alert("Fill all required details");
        }
      }
    } else {
      if (
        personalInfo.address1 !== undefined &&
        personalInfo.city !== undefined &&
        personalInfo.country !== undefined &&
        personalInfo.state !== undefined &&
        personalInfo.countryCode !== undefined &&
        personalInfo.telephoneType !== undefined &&
        personalInfo.phoneNumber !== undefined &&
        personalInfo.firstNameParentsOne !== undefined &&
        personalInfo.firstNameParentsTwo !== undefined &&
        personalInfo.familyNameParentsOne !== undefined &&
        personalInfo.familyNameParentsTwo !== undefined &&
        formTwoOthers.cbp !== undefined &&
        formTwoOthers.previousEmployer !== undefined
      ) {
        auth.setFormTwo(personalInfo);
        auth.setFormTwoOthers(formTwoOthers);
        navigate("/travel-information");
      } else {
        alert("Fill all required details");
      }
    }
  };

  return (
    <div className="w-[60%] mx-auto">
      <div className="flex items-center my-3 text-green-700 bg-green-100 py-2">
        <div className="bg-green-700 w-6 h-6 rounded-[50%] mx-2 flex items-center justify-center">
          <BsFillHandThumbsUpFill
            fill="#FFFF"
            style={{ height: "14px", width: "16px" }}
          />
        </div>
        <h4 className="text-[10px] font-bold">
          The email address GORDIANBRAUN@GMAIL.COM has been verified. Your
          progress has been saved and you may continue with your application
        </h4>
      </div>
      <h3 className="text-lg text-indigo-800">ENTER PERSONAL INFORMATION</h3>
      <h5 className="text-[12px]">Please provide all responses in English</h5>
      <h5 className="text-[12px] font-bold text-[#cf1b1b]">
        Required fields are indicated by a red asterisk *.
      </h5>
      <div className="flex justify-between mt-2 pt-3 pb-6 border-t">
        <h5 className="text-[12px]">
          Are you known by any other names or aliases?
          <span className="text-[#cf1b1b]">*</span>
        </h5>
        <select
          name="aliases"
          onChange={handleOtherChange}
          value={formTwoOthers.aliases}
          className="outline-none border-b text-[12px] border-black w-40"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {formTwoOthers.aliases === "yes" && (
        <div className="flex mb-6">
          <div className="w-[30%] mr-6">
            <input
              placeholder="Family Name*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.familyNameAliases}
              name="familyNameAliases"
              onChange={onChange}
            />
            <hr />
          </div>
          <div className="w-[30%]">
            <input
              placeholder="First (Given) Name*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.firstNameAliases}
              onChange={onChange}
              name="firstNameAliases"
            />
            <hr />
          </div>
        </div>
      )}
      <div className="flex justify-between mt-2 pt-3 pb-8 border-t">
        <h5 className="text-[12px]">
          Have you ever been issued a passport or national identity card for
          travel by any other country?
          <span className="text-[#cf1b1b]">*</span>
        </h5>
        <select
          name="issuedPassport"
          onChange={handleOtherChange}
          value={formTwoOthers.issuedPassport}
          className="outline-none border-b text-[12px] border-black w-40"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {formTwoOthers.issuedPassport === "yes" && (
        <div className="flex items-center justify-between mb-6">
          <div className="w-[20%]">
            <input
              placeholder="First (Given) Name*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.firstNamePassport}
              onChange={onChange}
              name="firstNamePassport"
            />
            <hr />
          </div>
          <select
            onChange={onChange}
            className="outline-none w-[20%] border-b text-[12px] border-black w-40"
            name="documentType"
          >
            <option value="">Document Type *</option>
            <option value="passportNumber">Passport Number</option>
            <option value="nationalId">National Id</option>
          </select>
          <div className="w-[20%]">
            <input
              placeholder="Document Number*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.documentNumber}
              name="documentNumber"
              onChange={onChange}
            />
            <hr />
          </div>
          <div className="w-[20%]">
            <input
              placeholder="Expiration Date*"
              type="date"
              className="outline-none text-[12px]"
              value={personalInfo.expiryDate}
              onChange={onChange}
              name="expiryDate"
            />
            <hr />
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg text-indigo-800">YOUR CONTACT INFORMATION</h3>
        <h5 className="text-[12px] mt-2">
          Please enter your contact information below
        </h5>
        <div className="flex justify-between mt-2">
          <div className="w-[25%]">
            <input
              placeholder="Address 1*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.address1}
              name="address1"
              onChange={onChange}
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Address 2"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.address2}
              onChange={onChange}
              name="address2"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Address 3"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.address3}
              onChange={onChange}
              name="address3"
            />
            <hr />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-[25%]">
            <input
              placeholder="City*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.city}
              onChange={onChange}
              name="city"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="State/Province/Region*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.state}
              onChange={onChange}
              name="state"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Country*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.country}
              onChange={onChange}
              name="country"
            />
            <hr />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-[25%]">
            <select
              onChange={onChange}
              name="telephoneType"
              className="w-full text-[10px]"
            >
              <option value="">Telephone Type*</option>
              <option value="mobile">Mobile</option>
            </select>
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Country Code*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.countryCode}
              onChange={onChange}
              name="countryCode"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Phone Number*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.phoneNumber}
              onChange={onChange}
              name="phoneNumber"
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-indigo-800">
          SOCIAL MEDIA <span>OPTIONAL</span>
        </h3>
        <h5 className="text-[12px]">
          Please enter information associated with your online presence over the
          past five years.
        </h5>
        <h4 className="text-[11px] mt-2">
          Social Media Frequently Asked Questions
        </h4>
        <div className="flex justify-between mt-2">
          <div className="w-[22%]">
            <input
              placeholder="Facebook Page Id"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.facebookId}
              onChange={onChange}
              name="facebookId"
            />
            <hr />
          </div>
          <div className="w-[22%]">
            <input
              placeholder="LinkeIn Profile Link"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.linkedInId}
              onChange={onChange}
              name="linkedInId"
            />
            <hr />
          </div>
          <div className="w-[22%]">
            <input
              placeholder="Twitter User ID"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.twitterId}
              onChange={onChange}
              name="twitterId"
            />
            <hr />
          </div>
          <div className="w-[22%]">
            <input
              placeholder="Instagram User ID"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.instagramId}
              onChange={onChange}
              name="instagramId"
            />
            <hr />
          </div>
        </div>
        <div className="flex mt-6">
          <div className="w-[25%] mr-6">
            <input
              placeholder="Provider/Platform"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.platform}
              onChange={onChange}
              name="platform"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="Social Media Identifier"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo.socialMedia}
              onChange={onChange}
              name="socialMedia"
            />
            <hr />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input type="checkbox" className="mr-4" />
          <h4 className="text-[10px]">I do not have an online presence</h4>
        </div>
        <h3 className="mt-6 text-lg text-indigo-800">
          GE/NEXUS/SENTRI MEMBERSHIP
        </h3>
        <div className="flex justify-between mt-3">
          <h5 className="text-[12px]">
            Are you a member of the CBP Global Entry/NEXUS/SENTRI Program?
            <span className="text-[#cf1b1b]">*</span>
          </h5>
          <select
            onChange={handleOtherChange}
            name="cbp"
            value={formTwoOthers.cbp}
            className="text-[12px]"
          >
            <option value="">--Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-indigo-800">PARENTS</h3>
        <h5 className="text-[12px]">
          Please list your parents names in the boxes to the right. All
          applicants are required to fill out this section
        </h5>
        <div className="flex mt-6">
          <div className="w-[25%] mr-6">
            <input
              placeholder="Family Name*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo?.familyNameParentsOne}
              onChange={onChange}
              name="familyNameParentsOne"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="First(Given) Name* "
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo?.firstNameParentsOne}
              onChange={onChange}
              name="firstNameParentsOne"
            />
            <hr />
          </div>
        </div>
        <div className="flex mt-6">
          <div className="w-[25%] mr-6">
            <input
              placeholder="Family Name*"
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo?.familyNameParentsTwo}
              onChange={onChange}
              name="familyNameParentsTwo"
            />
            <hr />
          </div>
          <div className="w-[25%]">
            <input
              placeholder="First(Given) Name* "
              type="text"
              className="outline-none text-[12px]"
              value={personalInfo?.firstNameParentsTwo}
              onChange={onChange}
              name="firstNameParentsTwo"
            />
            <hr />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-indigo-800">EMPLOYMENT INFORMATION</h3>
        <div className="flex justify-between">
          <h5 className="text-[12px]">
            Do you have a current or previous employer?
            <span className="text-[#cf1b1b]">*</span>
          </h5>
          <select
            onChange={handleOtherChange}
            value={formTwoOthers.previousEmployer}
            name="previousEmployer"
            className="text-[12px]"
          >
            <option value="">--Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between my-6">
        <a href="/" className="px-6 py-2 rounded border border-gray-300">
          SAVE AND EXIT
        </a>
        <h3 className="font-bold text-sm">Step 3 of 7</h3>
        <button
          onClick={() => {
            navigate("/image-upload");
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

export default PersonalInformation;
