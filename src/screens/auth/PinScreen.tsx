import React, { useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { StyleSheet } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import CustomNumberPad from "../../components/inputs/CustomNumberPad";
import OTPInput from "../../components/inputs/OTPInput";
import { navigate } from "../../utils/NavigationUtil";

const PinScreen = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);
  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }
  };

  const handlePressBackspace = () => {
    if (focusedIndex > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex - 1] = "";
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex - 1);
    }
  };

  const handlePressCheckmark = () => {
    let valid = false;
    const isNotEmpty = otpValues.map((i) => {
      if (i == "") {
        valid = true;
        setOtpError("Enter all PIN");
      }
    });
    if (!valid) {
      navigate("ConfirmPinScreen", {
        pin: otpValues.toString(),
      });
    }
  };

  return (
    <CustomSafeAreaView>
      <CustomText
        variant="h5"
        fontFamily={FONTS.Medium}
        style={styles.mainContainer}
      >
        Set up Groww PIN
      </CustomText>
      <CustomText style={styles.subText}>
        To keep your finances secure, we'll ask for this PIN every time you open
        the app
      </CustomText>
      <OTPInput
        otpValues={otpValues}
        error={otpError}
        focusedIndex={focusedIndex}
      />

      <CustomNumberPad
        onPressNumber={handlePressNumber}
        onPressBackspace={handlePressBackspace}
        onPressCheckmark={handlePressCheckmark}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    opacity: 0.8,
    fontSize: RFValue(9.5),
  },
});

export default PinScreen;
