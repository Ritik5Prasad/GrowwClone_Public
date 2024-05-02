import React, { useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@react-navigation/native";
import CustomButton from "../../components/global/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors as colorw } from "../../constants/Colors";
import OtpTimer from "../../components/auth/OtpTimer";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { SendOTP, VerifyOTP } from "../../redux/actions/userAction";
import { selectUser } from "../../redux/reducers/userSlice";

const PhoneScreen = () => {
  const { colors } = useTheme();
  const user = useAppSelector(selectUser);
  const theme = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const dispatch = useAppDispatch();
  const handleSendOTP = async () => {
    setLoading(true);
    await dispatch(SendOTP({ email: user.email || "", otp_type: "phone" }));
    setOtpSent(true);
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setOtpError("Enter OTP");
      return;
    }
    setLoading(true);
    await dispatch(
      VerifyOTP({
        email: user.email || "",
        otp_type: "phone",
        data: phoneNumber,
        otp: otp,
      })
    );
    setLoading(false);
  };

  const handlePress = async () => {
    if (otpSent) {
      handleVerifyOTP();
      return;
    }
    handleSendOTP();
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={styles.keyboardContainer}
    >
      <CustomSafeAreaView>
        <CustomText
          variant="h4"
          fontFamily={FONTS.Medium}
          style={styles.mainContainer}
        >
          {otpSent ? "Verify your mobile number" : "Enter mobile number"}
        </CustomText>

        {otpSent ? (
          <View style={styles.numberContainer}>
            <CustomText variant="h8">
              Enter the OTP sent to +91 {phoneNumber}
            </CustomText>
            <Icon
              color={colorw.profit}
              name="pencil"
              size={RFValue(12)}
              onPress={() => setOtpSent(false)}
            />
          </View>
        ) : (
          <CustomText variant="h8">
            Mobile number is required to invest in India
          </CustomText>
        )}

        {!otpSent ? (
          <View style={styles.phoneContainer}>
            <CustomText
              variant="h5"
              fontFamily={FONTS.NumberSemiBold}
              style={{ fontWeight: "bold" }}
            >
              +91
            </CustomText>
            <TextInput
              focusable={true}
              autoFocus={true}
              keyboardType="phone-pad"
              placeholder="9999999999"
              maxLength={10}
              style={[{ color: colors.text }, styles.textInput]}
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setOtpError("");
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.phoneContainer}>
              <TextInput
                focusable={true}
                autoFocus={true}
                keyboardType="phone-pad"
                placeholder="OTP"
                maxLength={6}
                style={[{ color: colors.text }, styles.textInput]}
                value={otp}
                onChangeText={(text) => setOtp(text)}
              />
            </View>
            <View style={styles.otpTimerContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme == "dark" ? colors.card : "#ccc",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <OtpTimer
                  style={{
                    fontSize: RFValue(10),
                    color: colors.text,
                    opacity: 0.8,
                    fontFamily: FONTS.Regular,
                  }}
                  type="OTP"
                  onPress={() => handleSendOTP()}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme == "dark" ? colors.card : "#ccc",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <CustomText
                  style={{
                    fontSize: RFValue(10),
                    color: colors.text,
                    opacity: 0.8,
                    fontFamily: FONTS.Regular,
                  }}
                >
                  Get OTP via call
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.btnContainer}>
          {otpError && (
            <View style={styles.errorContainer}>
              <CustomText variant="h7" fontFamily={FONTS.Medium}>
                Wrong OTP, 2 attempts remaining
              </CustomText>
            </View>
          )}
          <CustomButton
            text={otpSent ? "VERIFY" : "SEND OTP"}
            onPress={handlePress}
            loading={loading}
            disabled={loading}
          />
        </View>
      </CustomSafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    padding: 10,
    justifyContent: "center",
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 20,
  },
  btnContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  textInput: {
    width: "90%",
    fontWeight: "bold",
    fontSize: RFValue(15),
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 30,
    paddingLeft: 3,
  },
  keyboardContainer: {
    flex: 1,
  },
  mainContainer: {
    marginVertical: 10,
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  otpTimerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginTop: 50,
  },
});

export default PhoneScreen;
