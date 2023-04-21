import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../components/utils/auth";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import TextError from "../components/TextError";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { supabase } from "../utils/supabase";


function Review({ clientSecret }) {
  const [isValidForm, setIsValidForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [toggleThree, setToggleThree] = useState(false);
  const [toggleFour, setToggleFour] = useState(false);
  const [toggleFive, setToggleFive] = useState(false);
  const [confirmOne, setConfirmOne] = useState(false);
  const [confirmTwo, setConfirmTwo] = useState(false);
  const [confirmThree, setConfirmThree] = useState(false);
  const [confirmFour, setConfirmFour] = useState(false);
  const [verification, setVerification] = useState({
    passportNumber: "",
    issuingCountry: "",
    familyName: "",
    dob: "",
  });

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const auth = useAuth();

  const {
    formOne,
    setFormOne,
    formOneOthers,
    setFormOneOthers,
    formTwoOthers,
    setFormTwoOthers,
    formTwo,
    setFormTwo,
    formThree,
    setFormThree,
    formThreeEmergency,
    setFormThreeEmergency,
    formFour,
    setFormFour,
  } = auth;

  useEffect(() => {
    if (Object.keys(formOne).length === 0 || Object.keys(formTwo).length === 0 || Object.keys(formFour).length === 0) {
      alert("Please fill out all forms.")
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeFormOne = (e) => {
    setFormOne((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormOneOthers = (e) => {
    setFormOneOthers((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormTwo = (e) => {
    setFormTwo((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormTwoOthers = (e) => {
    setFormTwoOthers((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormThree = (e) => {
    setFormThree((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormThreeEmergency = (e) => {
    setFormThreeEmergency((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeFormFour = (e) => {
    setFormFour((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleOne = () => {
    setToggleOne(!toggleOne);
  };
  const handleToggleTwo = () => {
    setToggleTwo(!toggleTwo);
  };
  const handleToggleThree = () => {
    setToggleThree(!toggleThree);
  };
  const handleToggleFour = () => {
    setToggleFour(!toggleFour);
  };
  const handleToggleFive = () => {
    setToggleFive(!toggleFive);
  };
  const handleVerification = (e) => {
    e.preventDefault();
    setVerification((val) => ({
      ...val,
      [e.target.name]: e.target.value,
    }));
  };

  const initialValues = {
    passportNumber: verification.passportNumber,
    correctPassportNumber: formOne.passportNumber,
    issuingCountry: verification.country,
    correctIssuingCountry: formOne.country,
    familyName: verification.familyName,
    correctFamilyName: formOne.familyName,
    dob: verification.dob,
  };

  const validationSchema = Yup.object({
    passportNumber: Yup.string().oneOf(
      [Yup.ref("correctPassportNumber"), null],
      "Passport number and verify passport number don not match. Please check that your passport information is accurate"
    ),
    issuingCountry: Yup.string().oneOf(
      [Yup.ref("correctIssuingCountry"), null],
      "Country of citizenship and verify country of citizenship do not match. Please check that your country of citizenship information is accurate"
    ),
    familyName: Yup.string().oneOf(
      [Yup.ref("correctFamilyName"), null],
      "Family Name and Family Name do not match. Please check that your name information is accurate"
    ),
    dob: Yup.string().required("Date of birth is required"),
  });

  const receivePayment = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: process.env.REACT_APP_HOST_NAME,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };


  const saveData = async () => {
    console.log("called")
    const getBool = value => (value !== "no")
    setIsSaving(true)
    const { data: oldUser, error } = await supabase
      .from('users')
      .select('email', 'paid')
      .eq('email', formOneOthers.email)
      .eq('paid', true)
      .maybeSingle()
    if (error) {
      console.log(error, "error")
      setIsSaving(false)
      alert("Please try again later.")
      return
    }
    console.log(oldUser, "oldUser")
    if (!oldUser) {
      const { data, error } = await supabase.from("users").insert({
        first_name: formOne.firstName,
        family_name: formOne.familyName,
        email: formOneOthers.email,
        nationality: formOne.nationality,
        country: formOne.country,
        country_of_birth: formOne.cob,
        city: formOne.city,
        family_name_parent_one: formTwo.familyNameParentsOne,
        family_name_parent_two: formTwo.familyNameParentsTwo,
        first_name_parent_one: formTwo.firstNameParentsOne,
        first_name_parent_two: formTwo.firstNameParentsTwo,
        has_other_nationality: getBool(formOneOthers.otherNationality),
        has_prior_nationality: getBool(formOneOthers.priorNationality),
        national_id: formOne?.nationalId,
        personal_id: formOne?.personalId,
        date_of_birth: formOne?.dob
      }).select().single()
      if (error) {
        console.log(error, 'error')
        setIsSaving(false)
        alert("There was an error. Please try again later.")
      }
      else {
        const { error: addError } = await supabase.from("addresses").insert({
          user: data.id,
          address_one: formTwo.address1,
          city: formTwo.city,
          country: formTwo.country,
          country_code: formTwo.countryCode,
          phone_number: formTwo.phoneNumber,
          state: formTwo.state,
          telephone_type: formTwo.telephoneType,
          address_two: formTwo?.address2,
          address_three: formTwo?.address3,
          facebook_id: formTwo?.facebookId,
          instagram_id: formTwo?.instragramId,
          linkedin_id: formTwo?.linkedInId,
          twitter_id: formTwo?.twitterId,
          platform: formTwo?.platform,
          social_media: formTwo?.socialMedia
        }).single()
        if (addError) {
          setIsSaving(false)
          alert("There was an error. Please try again later.")
          console.log(addError, 'error')
        }
        else {
          const { error: travelInfoError } = await supabase.from("travel_info").insert({
            user: data.id,
            cbp: getBool(formTwoOthers.cbp),
            aliases: getBool(formTwoOthers.aliases),
            issued_passport: getBool(formTwoOthers.issuedPassport),
            has_previous_employer: getBool(formTwoOthers.previousEmployer),
            passport_number: formOne.passportNumber,
            passport_issuance_date: formOne.issuanceDate,
            passport_expiry_date: formOne.expirationDate,
            question_answers: formFour
          }).single()
          if (travelInfoError) {
            console.log("error", travelInfoError)
            setIsSaving(false)
            alert("There was an error. Please try again later.")
          }
          else {
            const { error: emergencyError } = await supabase.from("emergency_contact_info").insert({
              travel_is_in_transit: getBool(formThreeEmergency?.select2 || "no"),
              uspci_name: formThree?.name,
              uspci_address_line_1: formThree?.address1,
              uspci_address_line_2: formThree?.["address1-2"],
              uspci_phone: formThree?.phoneNumber,
              uspci_apartment_number: formThree?.apartmentNumber,
              uspci_city: formThree?.city,
              uspci_state: formThree?.state,
              uspci_country_code: formThree?.countryCode,
              in_us_family_name: formThreeEmergency?.familyName,
              in_us_first_name: formThreeEmergency?.firstName,
              in_us_email_address: formThreeEmergency?.email,
              in_us_phone_number: formThreeEmergency?.phoneNumber,
              in_us_country_code: formThreeEmergency?.countryCode,
              user: data.id
            }).single()
            if (!emergencyError) {
              setIsValidForm(true)
              setIsSaving(false)
            }
            else {
              setIsSaving(false)
            }
          }
        }
      }
    }
    else {
      console.log("You have already registered.")
      setIsSaving(false)
      alert("You have already registered.")
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();
    if (
      verification.familyName !== "" ||
      verification.issuingCountry !== "" ||
      verification.dob !== "" ||
      verification.passportNumber !== ""
    ) {
      saveData()
    } else {
      if (isValidForm) {
        alert("Complete the verification");
        setIsValidForm(false)
      }
    }
  };

  return (
    <div className="w-[65%] mx-auto">
      {message && <p id="payment-message" className="text-center text-black font-bold">{message}</p>}
      {clientSecret && isValidForm &&
        <div className="fixed min-h-screen w-full bg-white p-10 top-0 left-0 z-[1000] flex flex-col space-y-3 justify-center">
          <div className="flex mb-4 w-[30vw] justify-between items-center mx-auto">
            <h3 className="font-bold text-[red] cursor-pointer"
              onClick={() => setIsValidForm(false)}
            >Cancel</h3>
            <h2 className="text-black font-bold text-[24px]">Complete payment ($10)</h2>
            <h3 className="font-bold text-black cursor-pointer opacity-0 pointer-events-none"
            >Cancel</h3>
          </div>
          <form id="payment-form" onSubmit={receivePayment} className="stripe-form">
            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="mt-4 stripe-button">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </button>
          </form>
        </div>
      }
      <h3 className="uppercase text-lg text-indigo-800 my-4">
        Review your application
      </h3>
      <p className="text-[11px]">
        Please review all information for accuracy before submitting your
        application. If information is inaccurate, select the "Edit" option in
        the top right corner of the application review. Select "CONFIRM AND
        CONTINUE" if/when all information is correct.
      </p>
      <div className="mt-16 pb-8 shadow-sm shadow-gray-400 rounded-b-lg">
        <div
          className="flex items-center justify-between bg-[#e9e7e7] border-slate-300 border-[1px] cursor-pointer"
          onClick={handleToggleOne}
        >
          <div className="flex items-center">
            {toggleOne ? (
              <BiChevronDown
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            ) : (
              <BiChevronRight
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            )}
            <h4 className="font-bold text-[12px] text-indigo-700">
              APPLICANT INFORMATION
            </h4>
          </div>
          <div className="flex">
            {confirmOne && (
              <h3 className="mr-16 text-[12px] text-green-600 flex items-center font-bold">
                Reviewed
                <MdDone />
              </h3>
            )}
            <h3 className="flex text-[12px] items-center text-sm mr-4 text-[#4338ca]">
              Edit
              <HiPencil />
            </h3>
          </div>
        </div>
        {toggleOne && (
          <div className="flex flex-col">
            <div className="flex justify-between mt-8">
              <div className="ml-4">
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">Family Name</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.familyName}
                    onChange={onChangeFormOne}
                    name="familyName"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    Issuing Country
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.country}
                    onChange={onChangeFormOne}
                    name="issuingCountry"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    Country of Citizenship/Nationality
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.nationality}
                    onChange={onChangeFormOne}
                    name="nationality"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Sex</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.sex}
                    onChange={onChangeFormOne}
                    name="sex"
                  />
                </div>
                <div className="flex flex-col my-8">
                  <label className="font-bold text-[12px]">
                    Country of Birth
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.cob}
                    onChange={onChangeFormOne}
                    name="cob"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">
                    First (Given) Name
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.firstName}
                    onChange={onChangeFormOne}
                    name="firstName"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Issuance Date</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.issuanceDate}
                    onChange={onChangeFormOne}
                    name="issuanceDate"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    National Identification Number
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.nationalId}
                    onChange={onChangeFormOne}
                    name="nationalId"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Date of Birth</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.dob}
                    onChange={onChangeFormOne}
                    name="dob"
                  />
                </div>
              </div>
              <div className="mr-16">
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">
                    Passport Number
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.passportNumber}
                    onChange={onChangeFormOne}
                    name="passportNumber"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    Expiration Date
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.expiryDate}
                    onChange={onChangeFormOne}
                    name="expiryDate
"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    Personal Identification Number
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.personalId}
                    onChange={onChangeFormOne}
                    name="personalId"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">City of Birth</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formOne.city}
                    onChange={onChangeFormOne}
                    name="city"
                  />
                </div>
              </div>
            </div>
            <div className="pl-4 border-y">
              <h2 className="uppercase mt-6 text-[12px] font-bold text-indigo-800">
                Other Citizenship/Nationality
              </h2>
              <div className="mt-4 flex">
                <h2 className="text-[11px] mr-2">
                  Are you now, a citizen or national of any other country?
                </h2>
                <input
                  className="text-[11px] outline-none uppercase"
                  value={formOneOthers.otherNationality}
                  onChange={onChangeFormOneOthers}
                  name="otherNationality"
                />
              </div>
              <div className="mt-4 mb-8 flex">
                <h2 className="text-[11px] mr-2">
                  Have you ever been a citizen or national of any other country?
                </h2>
                <input
                  className="text-[11px] outline-none uppercase"
                  value={formOneOthers.priorNationality}
                  onChange={onChangeFormOneOthers}
                  name="priorNationality"
                />
              </div>
            </div>
            <div className="pl-4 py-6 border-t flex">
              <div className="mr-16">
                <h2 className="font-bold text-[12px]">E-mail Address</h2>
                <input
                  className="outline-none text-[12px] w-[200px]"
                  value={formOneOthers.email}
                  onChange={onChangeFormOneOthers}
                  name="email"
                />
              </div>
              <div>
                <h2 className="font-bold text-[12px]">
                  Confirm E-mail Address
                </h2>
                <input
                  className="outline-none text-[12px] w-[200px]"
                  value={formOneOthers.confirmEmail}
                  onChange={onChangeFormOneOthers}
                  name="confirmEmail"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setConfirmOne(true);
                setToggleOne(false);
                setToggleTwo(true);
              }}
              className="self-end py-2 mb-2 text-white text-[12px] bg-green-700 w-[150px] rounded"
            >
              CONFIRM & CONTINUE
            </button>
          </div>
        )}
        <div
          className="flex items-center justify-between bg-[#e9e7e7] border-slate-300 border-[1px] cursor-pointer"
          onClick={handleToggleTwo}
        >
          <div className="flex items-center">
            {toggleTwo ? (
              <BiChevronDown
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            ) : (
              <BiChevronRight
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            )}
            <h4 className="font-bold text-[12px] text-indigo-700">
              PERSONAL INFORMATION
            </h4>
          </div>
          <div className="flex">
            {confirmTwo && (
              <h3 className="mr-16 text-[12px] text-green-600 flex items-center font-bold">
                Reviewed
                <MdDone />
              </h3>
            )}
            <h3 className="flex text-[12px] items-center text-sm mr-4 text-[#4338ca]">
              Edit
              <HiPencil />
            </h3>
          </div>
        </div>
        {toggleTwo && (
          <div className="flex flex-col pl-4">
            <div className="flex mt-2">
              <h2 className="text-[12px] font-bold mr-2">
                Have you ever been issued a passport or national identity card
                by any other country?
              </h2>
              <input
                className="outline-none text-[12px] uppercase"
                value={formTwoOthers.issuedPassport}
                onChange={onChangeFormTwoOthers}
                name="issuedPassport"
              />
            </div>
            <h3 className="mt-16 text-indigo-800 text-sm">
              YOUR CONTACT INFORMATION
            </h3>
            <div className="flex justify-between mt-4 mb-8">
              <div>
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">
                    Address Line 1
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.address1}
                    onChange={onChangeFormTwo}
                    name="address1"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">City</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.city}
                    onChange={onChangeFormTwo}
                    name="city"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    Telephone Type
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.telephoneType}
                    onChange={onChangeFormTwo}
                    name="telephoneType"
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">
                    Address Line 2
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.address2}
                    onChange={onChangeFormTwo}
                    name="address2"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">
                    State/Province/Region
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.state}
                    onChange={onChangeFormTwo}
                    name="state"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Country Code</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.countryCode}
                    onChange={onChangeFormTwo}
                    name="countryCode"
                  />
                </div>
              </div>
              <div className="mr-16">
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">
                    Apartment Number
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.apartmentNumber}
                    onChange={onChangeFormTwo}
                    name="apartmentNumber"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Country</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.country}
                    onChange={onChangeFormTwo}
                    name="country"
                  />
                </div>
                <div className="flex flex-col mt-8">
                  <label className="font-bold text-[12px]">Phone Number</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.phoneNumber}
                    onChange={onChangeFormTwo}
                    name="phoneNumber"
                  />
                </div>
              </div>
            </div>
            <div className="border-y pb-4">
              <h2 className="uppercase mt-2 text-sm text-indigo-800">
                Social Media
                <span className="text-black text-[10px]">(optional)</span>
              </h2>
              <input
                className="text-[11px] outline-none uppercase"
                value={formTwo.socialMedia === "" ? "N/A" : formTwo.socialMedia}
                onChange={onChangeFormTwo}
                name="socialMedia"
              />
              <hr className="w-[30%]" />
            </div>
            <div className="border-t pb-8">
              <h2 className="text-sm my-2 text-indigo-800">
                GE/NEXUS/SENTRI MEMBERSHIP
              </h2>
              <div className="flex mt-4">
                <h2 className="text-[12px] mr-2">
                  Are you a member of the CBP Global Entry/NEXUS/SENTRI Program?
                </h2>
                <input
                  className="outline-none text-[12px] uppercase"
                  value={formTwoOthers.cbp}
                  onChange={onChangeFormTwoOthers}
                  name="cbp"
                />
              </div>
            </div>
            <div className="border-t pb-8">
              <h2 className="text-sm my-2 text-indigo-800">PARENTS</h2>
              <div className="flex mt-4">
                <div className="mr-32">
                  <div className="flex flex-col">
                    <label className="font-bold text-[12px]">Family Name</label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwo.familyNameParentsOne}
                      onChange={onChangeFormTwo}
                      name="familyNameParentsOne"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <label className="font-bold text-[12px]">Family Name</label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwo.familyNameParentsTwo}
                      onChange={onChangeFormTwo}
                      name="familyNameParentsTwo"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[12px]">
                      First(Given) Name
                    </label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwo.firstNameParentsOne}
                      onChange={onChangeFormTwo}
                      name="firstNameParentsOne"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <label className="font-bold text-[12px]">
                      First(Given) Name
                    </label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwo.firstNameParentsTwo}
                      onChange={onChangeFormTwo}
                      name="firstNameParentsTwo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t pb-8">
              <h2 className="text-sm my-2 text-indigo-800">
                EMPLOYMENT INFORMATION
              </h2>
              <div className="flex mt-4">
                <h2 className="text-[12px] mr-2">
                  Do you have a current or previous Employer?
                </h2>
                <input
                  className="outline-none text-[12px] uppercase"
                  value={formTwoOthers.previousEmployer}
                  onChange={onChangeFormTwoOthers}
                  name="previousEmployer"
                />
              </div>
              <div className="mt-8 flex">
                <div className="mr-32">
                  <div className="flex flex-col">
                    <label className="font-bold text-[12px]">Job Title</label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwoOthers.jobTitle}
                      onChange={onChangeFormTwoOthers}
                      name="jobTitle"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <label className="font-bold text-[12px]">
                      Address Line 1
                    </label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwoOthers.address1}
                      onChange={onChangeFormTwoOthers}
                      name="address1"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <label className="font-bold text-[12px]">
                      Employer Name
                    </label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwoOthers.employerName}
                      onChange={onChangeFormTwoOthers}
                      name="employerName"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <label className="font-bold text-[12px]">
                      Address Line 2
                    </label>
                    <input
                      className="text-[12px] outline-none pt-[2px]"
                      value={formTwoOthers.address2}
                      onChange={onChangeFormTwoOthers}
                      name="address2"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex">
                <div className="flex flex-col mr-32">
                  <label className="font-bold text-[12px]">City</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.city}
                    onChange={onChangeFormTwo}
                    name="city"
                  />
                </div>
                <div className="flex flex-col mr-32">
                  <label className="font-bold text-[12px]">
                    State/Province/Region
                  </label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.state}
                    onChange={onChangeFormTwo}
                    name="state"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">Country</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwo.country}
                    onChange={onChangeFormTwo}
                    name="country"
                  />
                </div>
              </div>
              <div className="mt-8 flex">
                <div className="flex flex-col mr-32">
                  <label className="font-bold text-[12px]">Country Code</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwoOthers.countryCode}
                    onChange={onChangeFormTwoOthers}
                    name="countryCode"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold text-[12px]">Phone Number</label>
                  <input
                    className="text-[12px] outline-none pt-[2px]"
                    value={formTwoOthers.phoneNumber}
                    onChange={onChangeFormTwoOthers}
                    name="phoneNumber"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setConfirmTwo(true);
                setToggleTwo(false);
                setToggleThree(true);
              }}
              className="self-end py-2 mb-2 text-white text-[12px] bg-green-700 w-[150px] rounded"
            >
              CONFIRM & CONTINUE
            </button>
          </div>
        )}
        <div
          className="flex items-center justify-between bg-[#e9e7e7] border-slate-300 border-[1px] cursor-pointer"
          onClick={handleToggleThree}
        >
          <div className="flex items-center">
            {toggleThree ? (
              <BiChevronDown
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            ) : (
              <BiChevronRight
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            )}
            <h4 className="font-bold text-[12px] text-indigo-700">
              TRAVEL INFORMATION
            </h4>
          </div>
          <div className="flex">
            {confirmThree && (
              <h3 className="mr-16 text-[12px] text-green-600 flex items-center font-bold">
                Reviewed
                <MdDone />
              </h3>
            )}
            <h3 className="flex text-[12px] items-center text-sm mr-4 text-[#4338ca]">
              Edit
              <HiPencil />
            </h3>
          </div>
        </div>
        {toggleThree && (
          <div className="pl-4 flex flex-col">
            <div className="flex mt-6">
              <h2 className="font-bold text-[12px] mr-2">
                Is your travel to the US occuring in transit to
                <br />
                country?
              </h2>
              <input
                className="outline-none uppercase text-[12px]"
                value={formThreeEmergency.select}
                name="select"
                onChange={onChangeFormThreeEmergency}
              />
            </div>
            <h2 className="mt-12 text-sm text-indigo-800">
              U.S. Point of Contact Information
            </h2>
            <div className="mt-8 flex flex-col">
              <label className="font-bold text-[12px]">Name</label>
              <input
                className="text-[12px] outline-none pt-[2px]"
                value={formThree.name}
                onChange={onChangeFormThree}
                name="name"
              />
            </div>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Address Line 1</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.address1}
                  onChange={onChangeFormThree}
                  name="address1"
                />
              </div>
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Address Line 2</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.address2}
                  onChange={onChangeFormThree}
                  name="address2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">
                  Apartment Number
                </label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.apartmentNumber}
                  onChange={onChangeFormThree}
                  name="apartmentNumber"
                />
              </div>
            </div>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">City</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.city}
                  onChange={onChangeFormThree}
                  name="city"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">
                  State/Province/Region
                </label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.state}
                  onChange={onChangeFormThree}
                  name="state"
                />
              </div>
            </div>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Country Code</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.countryCode}
                  onChange={onChangeFormThree}
                  name="countryCode"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">Phone Number</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.phoneNumber}
                  onChange={onChangeFormThree}
                  name="phoneNumber"
                />
              </div>
            </div>
            <h2 className="text-sm text-indigo-800 mt-10">
              Address While in the U.S.
            </h2>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Address Line 1</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.address1}
                  onChange={onChangeFormThree}
                  name="address1"
                />
              </div>
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Address Line 2</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.address2}
                  onChange={onChangeFormThree}
                  name="address2"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">
                  Apartment Number
                </label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.apartmentNumber}
                  onChange={onChangeFormThree}
                  name="apartmentNumber"
                />
              </div>
            </div>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">City</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.city}
                  onChange={onChangeFormThree}
                  name="city"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">
                  State/Province/Region
                </label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThree.state}
                  onChange={onChangeFormThree}
                  name="state"
                />
              </div>
            </div>
            <h2 className="mt-12 text-sm text-indigo-800 uppercase">
              Emergency contact information in or out of the u.s.
            </h2>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Family Name</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThreeEmergency.familyName}
                  onChange={onChangeFormThreeEmergency}
                  name="familyName"
                />
              </div>
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">
                  First(Given) Name
                </label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThreeEmergency.firstName}
                  onChange={onChangeFormThreeEmergency}
                  name="firstName"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">E-mail Address</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThreeEmergency.email}
                  onChange={onChangeFormThreeEmergency}
                  name="email"
                />
              </div>
            </div>
            <div className="mt-8 flex">
              <div className="mr-32 flex flex-col">
                <label className="font-bold text-[12px]">Country Code</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThreeEmergency.countryCode}
                  onChange={onChangeFormThreeEmergency}
                  name="countryCode"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-[12px]">Phone Number</label>
                <input
                  className="text-[12px] outline-none pt-[2px]"
                  value={formThreeEmergency.phoneNumber}
                  onChange={onChangeFormThreeEmergency}
                  name="phoneNumber"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setConfirmThree(true);
                setToggleThree(false);
                setToggleFour(true);
              }}
              className="self-end py-2 mb-2 text-white text-[12px] bg-green-700 w-[150px] rounded"
            >
              CONFIRM & CONTINUE
            </button>
          </div>
        )}
        <div
          className="flex items-center justify-between bg-[#e9e7e7] border-slate-300 border-[1px] cursor-pointer"
          onClick={handleToggleFour}
        >
          <div className="flex items-center">
            {toggleFour ? (
              <BiChevronDown
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            ) : (
              <BiChevronRight
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            )}
            <h4 className="font-bold text-[12px] text-indigo-700">
              ELIGIBILITY QUESTIONS
            </h4>
          </div>
          <div className="flex">
            {confirmFour && (
              <h3 className="mr-16 text-[12px] text-green-600 flex items-center font-bold">
                Reviewed
                <MdDone />
              </h3>
            )}
            <h3 className="flex text-[12px] items-center text-sm mr-4 text-[#4338ca]">
              Edit
              <HiPencil />
            </h3>
          </div>
        </div>
        {toggleFour && (
          <div className="flex flex-col pl-4">
            <div className="mt-3 flex justify-between items-start border-t pt-2">
              <div className="w-[75%]">
                <p className="text-[12px]">
                  1) Do you have a physical or mental disorder, or are you a
                  drug abuser or addict; or do you currently have any of the
                  following diseases (communicable diseases are specified
                  pursuant to 361(b) of the Public Health Service Act):
                </p>
                <ul className="mt-2 ml-6 text-[10px] list-disc">
                  <li>Cholera</li>
                  <li>Dipthenia</li>
                  <li>Tuberculosis, infectious</li>
                  <li>Plague</li>
                  <li>Smallpox</li>
                  <li>Yellow Fever</li>
                  <li>
                    Viral Hemorrhagic Fevers, including Ebola, Lassa, Marburg,
                    Crimean-Congo
                  </li>
                  <li>
                    Severe acute respiratory illness capable of transmitting to
                    other persons and likely to cause mortality
                  </li>
                </ul>
              </div>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q1}
                onChange={onChangeFormFour}
                name="q1"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                2) Have you ever been arrested or convicted for a crime that
                resulted in serious damage to property, or serious harm to
                another person or government authority?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q2}
                onChange={onChangeFormFour}
                name="q2"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                3) Have you ever violated any law related to possessing, using
                or sharing illegal drugs?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q3}
                onChange={onChangeFormFour}
                name="q3"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                4) Do you seek to engage in or have you ever engaged in
                terrorist activities, espionage, sabotage, or genocide?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q4}
                onChange={onChangeFormFour}
                name="q4"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                5) Have you ever committed fraud or misrepresented yourself or
                others to attain, or assist others to obtain, a visa or entry
                into the United States?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q5}
                onChange={onChangeFormFour}
                name="q5"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                6) Are you currently seeking employment into the United States
                or were you previously without prior permission from the U.S.
                government?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q6}
                onChange={onChangeFormFour}
                name="q6"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                7) Have you ever been denied a U.S. visa you applied for with
                your current or previous passport, or have you ever been refused
                admission to the United States or withdrawn your application for
                admission at a U.S. port of entry?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q7}
                onChange={onChangeFormFour}
                name="q7"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                8) Have you ever stayed in the United States longer than the
                admission period granted to you by the U.S. government?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q8}
                onChange={onChangeFormFour}
                name="q8"
              />
            </div>
            <div className="flex mt-8 justify-between border-t pt-2">
              <p className="text-[12px] w-[75%]">
                9) Have you ever traveled to, or been present in Iran, Iraq,
                Libya, North Korea, Somalia, Sudan, Syria or Yemen on or March
                1, 2011?
              </p>
              <input
                className="outline-none text-[12px] uppercase"
                value={formFour.q9}
                onChange={onChangeFormFour}
                name="q9"
              />
            </div>
            <button
              onClick={() => {
                setConfirmFour(true);
                setToggleFour(false);
                setToggleFive(true);
              }}
              className="self-end py-2 my-2 text-white text-[12px] bg-green-700 w-[150px] rounded"
            >
              CONFIRM & CONTINUE
            </button>
          </div>
        )}
        <div
          className="flex items-center justify-between bg-[#e9e7e7] border-slate-300 border-[1px] cursor-pointer"
          onClick={handleToggleFive}
        >
          <div className="flex items-center">
            {toggleFive ? (
              <BiChevronDown
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            ) : (
              <BiChevronRight
                style={{ width: "22px", height: "22px", fill: "#4338ca" }}
              />
            )}
            <h4 className="font-bold text-[12px] text-indigo-700">
              VERIFICATION
            </h4>
          </div>
        </div>
        {toggleFive && (
          <div className="flex flex-col pl-4">
            <h4 className="text-[12px] mt-4 ">
              For verification purposes, please re-enter the following
              information as shown on your ESTA eligible passport
            </h4>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form onChange={handleVerification}>
                <div className="mt-8 flex">
                  <div className="mr-32">
                    <div className="w-[150px]">
                      <Field
                        name="passportNumber"
                        placeholder="Passport Number*"
                        className="outline-none text-[12px] w-full my-3"
                      />
                      <hr />
                      <ErrorMessage
                        name="passportNumber"
                        component={TextError}
                      />
                    </div>
                    <div className="w-[150px] mt-8">
                      <Field
                        name="familyName"
                        placeholder="Family Name*"
                        className="outline-none text-[12px] w-full my-3"
                      />
                      <hr />
                      <ErrorMessage name="familyName" component={TextError} />
                    </div>
                  </div>
                  <div>
                    <div className="mr-4">
                      <div className="w-[150px]">
                        <Field
                          name="issuingCountry"
                          placeholder="Issuing Country*"
                          className="outline-none text-[12px] w-full my-3"
                        />
                        <hr />
                        <ErrorMessage
                          name="issuingCountry"
                          component={TextError}
                        />
                      </div>
                      <div className="w-[150px] mt-8">
                        <Field
                          type="date"
                          name="dob"
                          placeholder="Family Name*"
                        />
                        <hr />
                        <ErrorMessage name="dob" component={TextError} />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between my-6">
        <a href="/" className="px-6 py-2 rounded border border-gray-300">
          SAVE AND EXIT
        </a>
        <h3 className="font-bold text-sm">Step 6 of 7</h3>
        <button
          onClick={() => {
            navigate("/eligibility");
          }}
          className="px-12 py-2 rounded border border-gray-300"
        >
          PREVIOUS
        </button>
        <button
          onClick={onSubmit}
          disabled={isSaving}
          className="px-16 py-2 rounded border border-cyan-700 bg-cyan-700 text-white"
        >
          {isSaving ? "PROCESSING..." : "NEXT"}
        </button>
      </div>
    </div>
  );
}

export default Review;
