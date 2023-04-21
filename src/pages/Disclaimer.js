import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import success from "../assets/success.png"
import { supabase } from "../utils/supabase";

function Disclaimer() {
  const [toggleDisclaimer, setToggleDisclaimer] = useState(false);
  const [promotionAct, setPromotionAct] = useState(false);
  const [selected, setSelected] = useState("");
  const [actSelected, setActSelected] = useState("");
  const location = useLocation()

  const justPaid = location?.search && location?.search?.includes("redirect_status=succeeded")

  const navigate = useNavigate();

  const handleDisclaimerToggle = () => {
    setToggleDisclaimer(!toggleDisclaimer);
  };
  const handlePromtionActToggle = () => {
    setPromotionAct(!promotionAct);
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleActSelect = (e) => {
    setActSelected(e.target.value);
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (selected === "yes" && actSelected === "yes") {
      navigate("/image-upload");
    } else {
      alert("Read and agree to terms and conditions");
    }
  };

  const sortOutPayment = async () => {
    console.log("here...")
    try {
      const payment_intent = location.search.split("&")[0].replace("?payment_intent=", "")
      console.log(payment_intent, payment_intent.length, payment_intent === "pi_3Mz2GPKYf1O82b1D1T85AFBB")
      const { data } = await supabase.from("stripe_payments")
        .update({ fulfilled: true })
        .eq("payment_intent", payment_intent)
        .select("*")
        .single()
      await supabase.from("users").update({ paid_on: new Date().toLocaleString(), paid: true })
        .eq("email", data.email)
        .single()
      console.log(data)
    }
    catch (e) {

    }
  }

  useEffect(() => {
    if (location.search.includes("?payment_intent=")) {
      sortOutPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (justPaid) {
    return (
      <div className="bg-white h-screen flex flex-col pt-[100px] items-center">
        <div className="flex items-center justify-center mb-4">
          <img src={success} alt={"success"} />
        </div>
        <h3 className="text-center text-black text-xl">Payment Successful!</h3>
        <p className="text-center text-black text-base">You have successfully paid $10.00</p>
        <div className="mt-4 flex items-center justify-center">
          <button className="bg-blue flex items-center justify-center text-white rounded px-5 py-3"
            onClick={() => navigate("/")}
          >Go home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[65%] mt-3 mx-auto flex flex-col">
      <div
        className="flex items-center bg-[#e9e7e7] cursor-pointer"
        onClick={handleDisclaimerToggle}
      >
        {toggleDisclaimer ? (
          <BiChevronDown style={{ width: "24px", height: "25px" }} />
        ) : (
          <BiChevronRight style={{ width: "24px", height: "25px" }} />
        )}
        <h4 className="font-bold text-sm">Disclaimer</h4>
      </div>
      {toggleDisclaimer && (
        <div className="p-4 shadow-md shadow-gray-400 rounded-b-lg">
          <p className="text-[12px] text-justify">
            The Electronic System for Travel Authorization performs checks
            against law enforcement databases. All travelers seeking admission
            to the United States under the Visa Waiver Program are required to
            obtain an electronic travel authorization using this system prior to
            being granted boarding.
          </p>
          <p className="mt-4 text-[12px] text-justify">
            If your electronic travel authorization application is approved, it
            establishes that you are eligible to travel, but does not establish
            that you are admissible to the United States under the Visa Waiver
            Program. Upon arrival to the United States, you will be inspected by
            a U.S. Customs and Border Protection Officer at a port of entry who
            may determine that you are inadmissible under the Visa Waiver
            Program or for any reason under United States law.
          </p>
          <p className="mt-4 text-[12px] text-justify">
            A determination that you are not eligible for electronic travel
            authorization does not preclude you from applying for a visa to
            travel to the United States.
          </p>
          <p className="mt-4 text-[12px] text-justify">
            All information provided by you, or on your behalf by a designated
            third party, must be true and correct. An electronic travel
            authorization may be revoked at any time and for any reason, such as
            new information influencing eligibility. You may be subjective to
            administrative or criminal penalties if you knowingly and willfully
            make a materially false, fictitious, or fraudulent statement or
            representation in an electronic travel authorization application
            submitted by you or on your behalf.
          </p>
          <p className="mt-4 text-[12px] text-justify text-red">
            <span className="font-bold">WARNING: </span>If upon application for
            admission to the United States at a port of entry you are admitted
            under the Visa Waiver Program (VWP) by a U.S. Customs and Border
            Protection Officer, you may not accept unauthorized employment, or
            attend school, or represent the foreign information media during
            your visit under the program. You may not apply for 1) a change of
            nonimmigrant status. 2) an extension of stay, or 3) adjustment of
            status to temporary or permanent resident, unless eligible under
            section 245(c)(4) of the immigration and Nationality Act. Violation
            of these terms will subject you to REMOVAL
          </p>
          <h4 className="mt-4 text-[12px]">
            Please indicate that you have read and understand the information
            period above
          </h4>
          <div className="flex flex-col">
            <label className="text-[12px] flex items-center">
              <input
                type="radio"
                value="yes"
                checked={selected === "yes"}
                name="consent"
                onChange={handleSelect}
                className="mr-2"
              />{" "}
              Yes, I have read and understand the information and agree to these
              terms
            </label>
            <label className="text-[12px] flex items-center">
              <input
                type="radio"
                value="no"
                checked={selected === "no"}
                name="consent"
                onChange={handleSelect}
                className="mr-2"
              />{" "}
              No, I need additional clarification or I decline to provide
              acknowledgement
            </label>
          </div>
        </div>
      )}
      <div
        className="mt-4 flex items-center bg-[#e9e7e7] cursor-pointer"
        onClick={handlePromtionActToggle}
      >
        {promotionAct ? (
          <BiChevronDown style={{ width: "24px", height: "25px" }} />
        ) : (
          <BiChevronRight style={{ width: "24px", height: "25px" }} />
        )}
        <h4 className="font-bold text-sm">The Travel Promotion Act of 2009</h4>
      </div>
      {promotionAct && (
        <div className="p-4 shadow-md shadow-gray-400 rounded-b-lg">
          <p className="text-[12px] text-justify">
            On March 4,2010, President Obama signed into law the Travel
            Protection Act (TPA) of 2009. Pub I. No 111-145. The Act directs the
            secretary of Homeland Security to establish a fee for the use of the
            ESTA system. The Further Consolidated Applications Act 2020 (PL
            116-94) updated ESTA application fee to $21 comprised of $17 00 for
            each VWP applicant receiving authorization to travel to the United
            States and $4 00 for the processing of the ESTA application.
            Applicants who are denied authorization to travel to the U.S under
            the VWP will only be charged $4 00. The fee may only be paid by
            credit card or PayPal. Applicants may save the application data and
            return to the application at a later date to enter the payment
            information. However the application will not be submitted for
            processing until all payment information is completed.
          </p>
          <p className="mt-4 text-[12px] text-red text-justify">
            <span className="fon-bold">WARNING: </span>The administrative fee
            will be collected by credit card or PayPal. It is crucial that all
            applicants enter their ESTA and payment information accurately. If
            information is entered incorrectly, the applicant may be charged
            additional fees to reapply. Updates to an application will not
            accrue additional fees. Applicants who do not complete the payment
            process will not receive authorization to travel to the United
            States and will not be allowed to board any aircraft or vessel
            destined for the United States. If an applicant stops payment of the
            fee, his or her authorization to travel to United States will be
            revoked. CGP is not responsible for any additional fees that may be
            charged by the applicant's credit card company or PayPal for the
            transaction.
          </p>
          <p className="text-[12px] text-red text-justify">
            By pressing the 'Apply' button in the application process,
            applicants agree not to dispute any administrative fee charged by
            CGP for the use of the ESTA system, and further acknowledge that
            there are no refunds.
          </p>
          <h4 className="mt-4 text-[12px]">
            Please indicate that you have read and understand the information
            period above
          </h4>
          <div className="flex flex-col">
            <label className="text-[12px] flex items-center">
              <input
                type="radio"
                value="yes"
                checked={actSelected === "yes"}
                name="actconsent"
                onChange={handleActSelect}
                className="mr-2"
              />{" "}
              Yes, I have read and understand the information and agree to these
              terms
            </label>
            <label className="text-[12px] flex items-center">
              <input
                type="radio"
                value="no"
                checked={actSelected === "no"}
                name="actconsent"
                onChange={handleActSelect}
                className="mr-2"
              />{" "}
              No, I need additional clarification or I decline to provide
              acknowledgement
            </label>
          </div>
        </div>
      )}
      <div className="my-6 self-end">
        <button className="px-24 py-2 rounded border border-gray-500 mr-6">
          EXIT
        </button>
        <button
          onClick={handleNext}
          className="px-24 py-2 rounded border border-slate-700 bg-slate-500 text-white"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Disclaimer;
