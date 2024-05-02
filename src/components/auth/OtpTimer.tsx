import React, { FC, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { useTheme } from "@react-navigation/native";

interface OtpTimerProps {
  type: string;
  style?: TextStyle;
  onPress: () => void;
}

const OtpTimer: FC<OtpTimerProps> = ({ type, onPress, style }) => {
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = async () => {
    setLoading(true);
    await onPress();
    setTimer(30);
    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={timer === 0 ? handleResend : undefined}
      disabled={timer !== 0 || loading}
    >
      {loading ? (
        <ActivityIndicator size={RFValue(10)} color={colors.text} />
      ) : (
        <Text style={[styles.forgotText, { color: Colors.themeColor }, style]}>
          {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    fontFamily: FONTS.Medium,
    fontSize: RFValue(9),
  },
});

export default OtpTimer;
