import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/utils/auth";

function EligibilityQuestion() {
  const [questions, setQuestions] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
  });
  const auth = useAuth();
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setQuestions((formValue) => ({
      ...formValue,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setQuestions(auth.formFour);
    // eslint-disable-next-line
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (toggle === false) {
      alert("Agree to terms under certification");
    } else if (
      questions.q1 === "" ||
      questions.q2 === "" ||
      questions.q3 === "" ||
      questions.q4 === "" ||
      questions.q5 === "" ||
      questions.q6 === "" ||
      questions.q7 === "" ||
      questions.q8 === "" ||
      questions.q9 === ""
    ) {
      alert("Answer all the questions");
    } else {
      auth.setFormFour(questions);
      navigate("/review");
    }
  };
  return (
    <div className="w-[60%] mx-auto mt-4">
      <h2 className="uppercase text-lg text-indigo-800">
        Eligibility Questions
      </h2>
      <h4 className="text-[12px] text-indigo-800">
        Need additional guidance on eligibility questions?
      </h4>
      <h5 className="text-[12px] font-bold text-[#cf1b1b]">
        Required fields are indicated by a red asterisk *.
      </h5>
      <div className="mt-3 flex justify-between items-start border-t pt-2">
        <div className="w-[75%]">
          <p className="text-[12px]">
            1) Do you have a physical or mental disorder, or are you a drug
            abuser or addict; or do you currently have any of the following
            diseases (communicable diseases are specified pursuant to 361(b) of
            the Public Health Service Act)
            <span className="text-[#cf1b1b]">*</span>
          </p>
          <ul className="mt-2 ml-12 text-[12px] list-disc">
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
              Severe acute respiratory illness capable of transmitting to other
              persons and likely to cause mortality
            </li>
          </ul>
        </div>
        <select
          onChange={onChange}
          name="q1"
          value={questions.q1}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          2) Have you ever been arrested or convicted for a crime that resulted
          in serious damage to property, or serious harm to another person or
          government authority?<span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q2"
          value={questions.q2}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          3) Have you ever violated any law related to possessing, using or
          sharing illegal drugs?<span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q3"
          value={questions.q3}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          4) Do you seek to engage in or have you ever engaged in terrorist
          activities, espionage, sabotage, or genocide?
          <span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q4"
          value={questions.q4}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          5) Have you ever committed fraud or misrepresented yourself or others
          to attain, or assist others to obtain, a visa or entry into the United
          States?<span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q5"
          value={questions.q5}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          6) Are you currently seeking employment into the United States or were
          you previously without prior permission from the U.S. government?
          <span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q6"
          value={questions.q6}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          7) Have you ever been denied a U.S. visa you applied for with your
          current or previous passport, or have you ever been refused admission
          to the United States or withdrawn your application for admission at a
          U.S. port of entry?<span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q7"
          value={questions.q7}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-t pt-2">
        <p className="text-[12px] w-[75%]">
          8) Have you ever stayed in the United States longer than the admission
          period granted to you by the U.S. government?
          <span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q8"
          value={questions.q8}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="flex mt-8 justify-between border-y pt-2 pb-4">
        <p className="text-[12px] w-[75%]">
          9) Have you ever traveled to, or been present in Iran, Iraq, Libya,
          North Korea, Somalia, Sudan, Syria or Yemen on or March 1, 2011?
          <span className="text-[#cf1b1b]">*</span>
        </p>
        <select
          onChange={onChange}
          name="q9"
          value={questions.q9}
          className="text-[12px]"
        >
          <option value="">--Please Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <h2 className="mt-3 mb-2 uppercase text-lg text-indigo-800">
        Waiver of Rights
      </h2>
      <p className="text-[12px]">
        I have read and understand that I hereby waive for the duration of my
        travel authorization obtained via ESTA rights to reveal or appeal of a
        U.S. Customs and Border Protection Officer's determination as to my
        admissibility, or to contest, other than on the basis of application for
        asylum, any removal action from an application for admission under the
        Visa Waiver Program.
      </p>
      <p className="text-[12px] mt-2">
        In addition to the above waiver, as a condition of each admission into
        the United States under the Visa Waiver Program. I agree that the
        submission of biometric identifiers (including fingerprints and
        photographs) during processing upon arrival in the United States shall
        reaffirm my waiver of any rights to review or appeal of a U.S. Customs
        and Border Protection Officer's determination as to my admissibility, or
        to contest other than on the basis of an application for asylum, any
        removal action arising from an application for admission under the Visa
        Waiver program
      </p>
      <h3 className="mt-2 text-indigo-800">
        CERTIFICATION <span className="text-[#cf1b1b]">*</span>
      </h3>
      <div className="text-[12px]">
        <input
          className="mr-2"
          onChange={() => setToggle(!toggle)}
          checked={toggle === true}
          type="checkbox"
          name="check"
        />
        For third-parties submitting the application on behalf of the candidate,
        I hereby certify that I have read to the individual whose name appears
        on the application (applicant) all the questions and statements on this
        application. I further certify that the applicant certifies that he or
        she has read, or has had read to to him or her, all the questions and
        statements on the application, understands all the questions and
        statements of the application and waives any rights to review or appeal
        to the U.S. Customs and Border Protection Officer's determination as to
        his or her admissibility, or to contest, other than on the basis of an
        application for asylum, any removal action arising from an application
        for admission under the Visa Waiver Program. The answers and information
        furnished in this application are true and correct to the best of the
        applicant's knowledge and belief
      </div>
      <div className="flex items-center justify-between my-6">
        <a href="/" className="px-6 py-2 rounded border border-gray-300">
          SAVE AND EXIT
        </a>
        <h3 className="font-bold text-sm">Step 5 of 7</h3>
        <button
          onClick={() => {
            navigate("/travel-information");
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

export default EligibilityQuestion;
