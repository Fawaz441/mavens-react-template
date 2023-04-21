import { useEffect, useState } from "react";
import { ReactComponent as Passport } from "../assets/passport.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/utils/auth";

const defaults = {
  familyName: "",
  passportNumber: "",
  issuanceDate: "",
  nationality: "",
  personalId: "",
  sex: "",
  city: "",
  firstName: "",
  issuingCountry: "",
  expiryDate: "",
  nationalId: "",
  dob: "",
  cob: "",
};

function ImageUpload() {
  const [uploadedId, setUploadedId] = useState(null);
  const [idText, setIdText] = useState({});
  const [formDetails, setFormDetails] = useState({ ...defaults });
  const [formOneOthers, setFormOneOthers] = useState({
    otherNationality: "",
    priorNationality: "",
    email: "",
    confirmEmail: "",
  });
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setFormDetails(auth.formOne);
    setFormOneOthers(auth.formOneOthers);
    // eslint-disable-next-line
  }, []);

  const handleImageUpload = (e) => {
    setUploadedId(e.target.files[0]);
  };

  const onChange = (e) => {
    setFormDetails((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtherChange = (e) => {
    setFormOneOthers({ ...formOneOthers, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formOneOthers.email !== formOneOthers.confirmEmail) {
      alert("Email must match");
      return;
    } else {
      if (
        formDetails.familyName !== "" &&
        formDetails.firstName !== "" &&
        formDetails.passportNumber &&
        formDetails.issuingCountry !== "" &&
        formDetails.issuanceDate !== "" &&
        formDetails.expiryDate !== "" &&
        formDetails.nationality !== "" &&
        formDetails.nationalId !== "" &&
        formDetails.dob !== "" &&
        formDetails.city !== "" &&
        formDetails.cob !== "" &&
        formOneOthers.otherNationality !== "" &&
        formOneOthers.priorNationality !== ""
      ) {
        auth.setFormOne(formDetails);
        auth.setFormOneOthers(formOneOthers);
        navigate("/personal-information");
      } else {
        alert("Fill all required fields in the form to continue");
      }
    }
  };

  useEffect(() => {
    if (Object.keys(idText).length === 0) {
      return;
    } else {
      const {
        birth_date,
        birth_place,
        country,
        expiry_date,
        gender,
        given_names,
        id_number,
        issuance_date,
        mrz2,
        surname,
      } = idText?.document?.inference?.prediction;
      let genderNew;
      if (
        gender?.value?.toLowerCase() === "male" ||
        gender?.value?.toUpperCase() === "M"
      ) {
        genderNew = "male";
      } else if (
        gender?.value?.toLowerCase() === "female" ||
        gender?.value?.toUpperCase() === "F"
      ) {
        genderNew = "female";
      } else {
        genderNew = "";
      }
      setFormDetails({
        familyName: surname.value,
        passportNumber: mrz2.value,
        issuanceDate: issuance_date.value,
        nationality: country.value,
        personalId: id_number.value,
        sex: genderNew,
        city: birth_place.value,
        firstName: !Array.isArray(given_names)
          ? given_names.value
          : given_names.length === 0
            ? ""
            : given_names[0].value,
        issuingCountry: country.value,
        nationalId: mrz2.value,
        expiryDate: expiry_date.value,
        dob: birth_date.value,
        cob: country.value,
      });
    }
  }, [idText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myFile = uploadedId;
    if (!myFile) {
      alert("Upload your passport");
      return;
    }
    let data = new FormData();
    data.append("document", myFile, myFile.name);
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        setIdText(JSON.parse(this.responseText));
      }
    });

    xhr.open(
      "POST",
      "https://api.mindee.net/v1/products/mindee/passport/v1/predict"
    );
    xhr.setRequestHeader(
      "Authorization",
      "Token e90bf6f692dec3c47c3b0f2e0c1908e8"
    );
    xhr.send(data);
  };

  return (
    <div className="w-[75%] mx-auto">
      <h3 className="text-2xl text-[#0ed3e9] font-medium">
        ENTER APPLICANT INFORMATION
      </h3>
      <p className="text-[#575656] text-[13px]">
        The following information is required of every non-immigrant visitor not
        in possession of a visitor's visa who is a national of one of the
        countries{" "}
        <span className="align-top text-[8px] text-[#0ed3e9]">[1]</span> listed
        in <span className="text-[#2496ed]">8 CFR 217.2</span>. Please enter all
        information requested. Each member of your traveling party must complete
        a separate application
      </p>
      <h4 className="mt-2 text-sm font-medium text-[#1E2121]">
        Please provide all responses in English.
      </h4>
      <h4 className="text-sm font-medium text-[#cf1b1b]">
        Required fields are indicated by a red asterisk *
      </h4>
      <div className="mt-4 display flex justify-between">
        <div className="">
          <h2 className="text-[#2496ed]">APPLICANT/PASSPORT INFORMATION</h2>
          <h5>
            Refer to your <span>passport</span> and enter all information in the
            same format
          </h5>
          <form method="post" className="flex">
            <div className="mr-6">
              <div className="flex flex-col mt-4">
                <label htmlFor="familyName">
                  Family Name <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.familyName}
                  name="familyName"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="passportNumber">
                  Passport Number <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.passportNumber}
                  name="passportNumber"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="issuanceDate">
                  Issuance Date <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.issuanceDate}
                  type="date"
                  name="issuanceDate"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="nationality">
                  Country of Citizenship/Nationality{" "}
                  <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.nationality}
                  name="nationality"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  onChange={onChange}
                  name="personalId"
                  value={formDetails.personalId}
                  placeholder="Personal Identification Number"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label>
                  Sex <span className="text-[#cf1b1b]">*</span>
                </label>
                {formDetails.gender === "" ? (
                  <select className="outline-none mt-2">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <select
                    value={formDetails.gender}
                    className="outline-none mt-2"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}

                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="city">
                  City of Birth <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.city}
                  name="city"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
            </div>
            <div>
              <div className="flex flex-col mt-4">
                <label htmlFor="firstName">
                  First(Given) Name <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.firstName}
                  name="firstName"
                  className="border-none bg-white outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="country">
                  Issuing Country <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.issuingCountry}
                  name="country"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="expirationDate">
                  Expiration Date <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.expiryDate}
                  type="date"
                  name="expirationDate"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-white" htmlFor="nationalId">
                  National Id
                </label>
                <input
                  value={formDetails.nationalId}
                  onChange={onChange}
                  placeholder="National Identification Number *"
                  required
                  name="nationalId"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-16 pt-2">
                <label htmlFor="dob">
                  Date of Birth <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.dob}
                  type="date"
                  required
                  name="dob"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="cob">
                  Country of Birth <span className="text-[#cf1b1b]">*</span>
                </label>
                <input
                  onChange={onChange}
                  value={formDetails.cob}
                  name="cob"
                  className="border-none outline-none"
                />
                <hr className="mt-2 w-[300px] text-[#1E2121]" />
              </div>
            </div>
          </form>
        </div>
        <div>
          <label className="px-12 py-4 bg-[#5238d9] text-white">
            <input
              className="hidden "
              type="file"
              id="my-file-input"
              onChange={handleImageUpload}
            />
            📷Upload Your Passport
          </label>
          <h4 className="text-justify font-thin text-sm mt-4 w-[270px]">
            Upload only the lower part of the picture containing the plastic
            page with information. Avoid capturing unnecessary background or
            surroundings.
          </h4>
          <span>
            <Passport style={{ width: "18rem", height: "18rem" }} />
          </span>
          <button
            className="bg-[#2496ed] px-4 py-2 rounded-xl align-self-center"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-[#2496ed]">OTHER CITIZENSHIP/NATIONALITY</h2>
        <div className="flex justify-between mt-6">
          <h5>
            Are you now, a citizen or national of any other country?
            <span className="text-[#cf1b1b]">*</span>
          </h5>
          <select
            name="otherNationality"
            value={formOneOthers.otherNationality}
            className="outline-none border-b border-black w-40"
            onChange={handleOtherChange}
          >
            <option value="">--Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="flex justify-between mt-6">
          <h5>
            Have you ever been a citizen or national of any other country?
            <span className="text-[#cf1b1b]">*</span>
          </h5>
          <select
            name="priorNationality"
            value={formOneOthers.priorNationality}
            className="outline-none border-b border-black w-40"
            onChange={handleOtherChange}
          >
            <option value="">--Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="flex mt-12">
          <div className="mr-8 flex flex-col">
            <label>
              Email Address <span className="text-[#cf1b1b]">*</span>
            </label>
            <input
              onChange={handleOtherChange}
              value={formOneOthers.email}
              type="email"
              name="email"
              className="border-none outline-none w-[16rem]"
            />
            <hr className="" />
          </div>
          <div className="flex flex-col">
            <label>
              Confirm Email Address <span className="text-[#cf1b1b]">*</span>
            </label>
            <input
              onChange={handleOtherChange}
              value={formOneOthers.confirmEmail}
              type="email"
              name="confirmEmail"
              className="border-none outline-none w-[16rem]"
            />
            <hr className="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between my-6">
        <a href="/" className="px-24 py-2 rounded border border-gray-300">
          SAVE AND EXIT
        </a>
        <h3 className="font-bold text-sm">Step 2 of 7</h3>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-24 py-2 rounded border border-gray-300"
        >
          PREVIOUS
        </button>
        <button
          onClick={handleNext}
          className="px-24 py-2 rounded border border-cyan-700 bg-cyan-700 text-white"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
