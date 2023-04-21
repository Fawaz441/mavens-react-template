import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Disclaimer from "./pages/Disclaimer";
import ImageUpload from "./pages/ImageUpload";
import PersonalInformation from "./pages/PersonalInformation";
import TravelInformation from "./pages/TravelInformation";
import EligibilityQuestion from "./pages/EligibilityQuestion";
import ReviewWrapper from "./components/ReviewWrapper";

const AppRoutes = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Disclaimer />} />
      <Route path="/image-upload" element={<ImageUpload />} />
      <Route path="/personal-information" element={<PersonalInformation />} />
      <Route path="/travel-information" element={<TravelInformation />} />
      <Route path="/eligibility" element={<EligibilityQuestion />} />
      <Route path="/review" element={<ReviewWrapper />} />
      {/* <Route path="/" element={<Disclaimer />}/> */}
    </Routes>
  );
};

export default AppRoutes;
