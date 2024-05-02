import React, { useState } from "react";
import BiometricVerification from "./BiometricVerification";
import ResetPin from "./ResetPin";

const AuthVerificationScreen = () => {
  const [authScreen, setAuthScreen] = useState("Biometric");
  return (
    <>
      {authScreen == "Biometric" ? (
        <BiometricVerification onForgotPin={() => setAuthScreen("ResetPin")} />
      ) : (
        <ResetPin />
      )}
    </>
  );
};

export default AuthVerificationScreen;
