import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import GuidelineText from "../../components/global/GuidelineText";
import BackButton from "../../components/global/BackButton";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CustomButton from "../../components/global/CustomButton";
import CustomInput from "../../components/inputs/CustomInput";
import { validatePasswordEntry } from "../../utils/ValidationUtils";
import OtpTimer from "../../components/auth/OtpTimer";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import CustomText from "../../components/global/CustomText";
import { useAppDispatch } from "../../redux/reduxHook";
import { SendOTP, VerifyOTP } from "../../redux/actions/userAction";

interface PasswordInputs {
  password: string;
  confirmpassword: string;
  otp: string;
}

const ForgotPassword = ({ route }: any) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [inputs, setInputs] = useState<PasswordInputs>({
    password: "",
    confirmpassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text: string, fieldName: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: text,
    }));
    // Clear the error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string | undefined } = {};
    if (!inputs.password.trim()) {
      newErrors.password = "Enter new password";
    }
    if (!inputs.confirmpassword.trim()) {
      newErrors.confirmpassword = "Enter confirm password";
    }
    if (
      !validatePasswordEntry(inputs.password, "test", route?.params?.email)
        .result
    ) {
      newErrors.password =
        "Set a stronger password, kindly refer to guidelines below.";
    }

    if (inputs?.confirmpassword != inputs?.password) {
      newErrors.confirmpassword = "Confirm Password not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (validateForm()) {
      setLoading(true);
      await dispatch(
        SendOTP({ email: route.params.email || "", otp_type: "reset_password" })
      );
      setOtpSent(true);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    await dispatch(
      VerifyOTP({
        email: route.params.email || "",
        otp_type: "reset_password",
        data: inputs.confirmpassword,
        otp: inputs.otp,
      })
    );
    setLoading(false);
  };

  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomInput
        label="NEW PASSWORD"
        placeholder="8-20 Characters"
        value={inputs?.password}
        error={errors?.password}
        onChangeText={(text) => handleOnChange(text, "password")}
        password
      />
      <CustomInput
        label="CONFIRM NEW PASSWORD"
        placeholder="8-20 Characters"
        error={errors?.confirmpassword}
        value={inputs.confirmpassword}
        onChangeText={(text) => handleOnChange(text, "confirmpassword")}
        password
      />

      {otpSent && (
        <CustomInput
          error={errors?.otp}
          value={inputs.otp}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={verifyOtp}
          rightIcon={
            <OtpTimer
              style={{
                color: colors.text,
                opacity: 0.8,
                fontSize: RFValue(10),
                right: 20,
              }}
              type="email"
              onPress={() => handleUpdatePassword()}
            />
          }
          maxLength={6}
          onChangeText={(text) => handleOnChange(text, "otp")}
        />
      )}

      <View style={GlobalStyles.bottomBtn}>
        {errors?.otp && (
          <View style={styles.errorContainer}>
            <CustomText variant="h7">
              Wrong OTP, 2 attempts remaining
            </CustomText>
          </View>
        )}
        <GuidelineText
          text={[
            "Password must have at least one uppercase and lowercase letter.",
            "Must contain at least one number and one special character",
            "Must not contain user's first/last name & email id",
            "Must be different from previous password",
          ]}
        />
        <CustomButton
          disabled={loading}
          loading={loading}
          text={otpSent ? "UPDATE PASSWORD" : "SEND OTP"}
          onPress={otpSent ? verifyOtp : handleUpdatePassword}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    padding: 10,
    justifyContent: "center",
    borderRadius: 4,
    alignItems: "center",
  },
});

export default ForgotPassword;
