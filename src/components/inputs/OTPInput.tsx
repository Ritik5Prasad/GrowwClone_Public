import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Text, Animated } from "react-native";
import { Colors } from "../../constants/Colors";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import Icon2 from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "react-native";

interface OTPInputProps {
  otpValues: any;
  focusedIndex: number;
  error?: string | null;
}

const OTPInput: React.FC<OTPInputProps> = ({
  error,
  otpValues,
  focusedIndex,
}) => {
  const { colors } = useTheme();
  const [shakeAnimation] = useState(new Animated.Value(0));
  const theme = useColorScheme();
  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <View style={styles.container}>
        {otpValues?.map((text: string, index: number) => (
          <Animated.View
            key={index}
            style={[
              styles.inputBox,
              {
                borderColor: error
                  ? Colors.errorColor
                  : focusedIndex === index
                  ? colors.text
                  : otpValues[index] !== ""
                  ? Colors.profit
                  : theme == "dark"
                  ? "#4f4e4a"
                  : "#ccc",
                borderWidth: focusedIndex === index ? 2 : 1,
                transform: [{ translateX: shakeAnimation }],
              },
            ]}
          >
            <CustomText
              style={{
                color: otpValues[index] !== "" ? Colors.profit : colors.text,
              }}
              fontFamily={FONTS.Number}
              variant="h5"
            >
              {text}
            </CustomText>
          </Animated.View>
        ))}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Icon2
            size={RFValue(13)}
            name="information-circle"
            style={styles.errorText}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    gap: 5,
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(11),
    fontFamily: FONTS.Medium,
  },
  inputBox: {
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OTPInput;
