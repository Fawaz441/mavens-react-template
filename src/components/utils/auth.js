import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [formOne, setFormOne] = useState({});
  const [formOneOthers, setFormOneOthers] = useState({});
  const [formTwo, setFormTwo] = useState({});
  const [formTwoOthers, setFormTwoOthers] = useState({});
  const [formThree, setFormThree] = useState({});
  const [formThreeEmergency, setFormThreeEmergency] = useState({});
  const [formFour, setFormFour] = useState({});

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
