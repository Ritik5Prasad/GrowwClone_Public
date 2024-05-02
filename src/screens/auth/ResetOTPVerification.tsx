import React, { FC, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import CustomButton from "../../components/global/CustomButton";
import { useTheme } from "@react-navigation/native";
import OtpTimer from "../../components/auth/OtpTimer";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { selectUser } from "../../redux/reducers/userSlice";
import { SendOTP, VerifyOTP } from "../../redux/actions/userAction";

interface pin {
  pin: string;
}

const ResetOTPVerification: FC<pin> = ({ pin }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string>("");
  const { colors } = useTheme();
  const handleVerification = async () => {
    setLoading(true);
    if (!otp) {
      setLoading(false);
      setOtpError("Enter OTP");
      return;
    }

    await dispatch(
      VerifyOTP({
        email: user.email || "",
        data: pin,
        otp: otp,
        otp_type: "reset_pin",
      })
    );

    setLoading(false);
  };

  const handleChange = (text: string) => {
    setOtp(text);
    setOtpError(null);
  };

  const resendOtp = async () => {
    await dispatch(SendOTP({ email: user.email || "", otp_type: "reset_pin" }));
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={styles.keyboardContainer}
    >
      <CustomSafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Icon color={Colors.profit} name="lock" size={RFValue(22)} />
          <CustomText variant="h6" fontFamily={FONTS.Bold} style={styles.title}>
            Verify Identity
          </CustomText>

          <CustomText style={styles.subText}>
            Enter OTP sent to +91 *****02312
          </CustomText>

          <TextInput
            value={otp}
            maxLength={6}
            onChangeText={handleChange}
            autoFocus
            keyboardType="number-pad"
            style={[styles.input, { color: colors.text }]}
            caretHidden
          />

          {otpError && <Text style={styles.errorText}>{otpError}</Text>}

          <OtpTimer
            onPress={() => resendOtp()}
            type="otp"
            style={styles.timer}
          />
        </ScrollView>

        <View style={styles.btnContainer}>
          <CustomButton
            text={"VERIFY"}
            onPress={handleVerification}
            loading={loading}
            disabled={false}
          />
        </View>
      </CustomSafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: RFValue(10),
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: RFValue(11),
    fontFamily: FONTS.Regular,
    marginTop: 20,
  },
  btnContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 15,
  },
  subText: {
    fontSize: RFValue(10),
    marginTop: 15,
    opacity: 0.8,
  },
  logoutText: {
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10),
  },
  keyboardContainer: {
    flex: 1,
  },
  title: {
    marginTop: 20,
  },
  input: {
    marginTop: 80,
    fontSize: RFValue(18),
    borderBottomWidth: 2,
    borderBottomColor: Colors.light_border,
    width: "30%",
    textAlign: "center",
  },
  timer: {
    fontSize: RFValue(10),
    marginTop: 60,
  },
});

export default ResetOTPVerification;
