import React, { useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomInput from "../../components/inputs/CustomInput";
import { RFValue } from "react-native-responsive-fontsize";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import { goBack, navigate } from "../../utils/NavigationUtil";
import { ScrollView } from "react-native";
import OtpTimer from "../../components/auth/OtpTimer";
import { useAppDispatch } from "../../redux/reduxHook";
import { SendOTP, VerifyOTP } from "../../redux/actions/userAction";

const EmailOtpScreen = ({ route }: any) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const [otpError, setOtpError] = useState("");
  const handleSubmit = async () => {
    if (!otp) {
      setOtpError("Enter OTP");
      return;
    }
    setLoading(true);
    await dispatch(
      VerifyOTP({
        email: route.params.email,
        otp: otp,
        otp_type: "email",
        data: null,
      })
    );
    setLoading(false);
  };

  const resendOTPHandler = async () => {
    await dispatch(SendOTP({ email: route?.params?.email, otp_type: "email" }));
  };
  return (
    <CustomSafeAreaView>
      <ScrollView>
        <CenteredLogo />

        <TouchableOpacity onPress={() => goBack()}>
          <View pointerEvents="none">
            <CustomInput label="EMAIL ADDRESS" value={route.params.email} />
          </View>
        </TouchableOpacity>

        <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          value={otp}
          onChangeText={(t) => {
            setOtp(t);
            setOtpError("");
          }}
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          error={otpError}
          returnKeyType="done"
          maxLength={6}
          keyboardType="number-pad"
          rightText={
            <OtpTimer type="email" onPress={() => resendOTPHandler()} />
          }
        />
      </ScrollView>
      <View style={GlobalStyles.bottomBtn}>
        <CustomButton
          text="VERIFY EMAIL ID"
          loading={loading}
          disabled={loading}
          onPress={() => handleSubmit()}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    fontSize: RFValue(10),
    marginTop: 0,
  },
});

export default EmailOtpScreen;
