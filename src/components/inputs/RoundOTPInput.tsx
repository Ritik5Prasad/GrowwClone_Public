import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import TouchableText from "../auth/TouchableText";

interface RoundOTPInputProps {
  otpValues: any;
  error?: string | null;
  loading: boolean;
  onForgotPin: ()=>void;
}

const RoundOTPInput: React.FC<RoundOTPInputProps> = ({
  error,
  otpValues,
  loading,
  onForgotPin
}) => {
  const { colors } = useTheme();

  const [animatedValues] = useState(() =>
    Array.from({ length: otpValues.length }, () => new Animated.Value(1))
  );

  useEffect(() => {
    if (loading) {
      startAnimation();
    } else {
      resetAnimation();
    }
  }, [loading]);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValues.map((val) =>
          Animated.sequence([
            Animated.timing(val, {
              toValue: 0.8,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(val, {
              toValue: 1,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        )
      )
    ).start();
  };

  const resetAnimation = () => {
    animatedValues.forEach((val) => val.setValue(1));
  };

  const [shakeAnimation] = useState(new Animated.Value(0));

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
                borderColor: colors.text,
                borderWidth: 2,
                backgroundColor:
                  otpValues[index] !== "" ? colors.text : "transparent",
                transform: [
                  { translateX: shakeAnimation },
                  { scale: animatedValues[index] },
                ],
                borderRadius: 40,
              },
            ]}
          ></Animated.View>
        ))}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableText
            firstText="Forgot PIN?"
            onPress={()=>onForgotPin()}
            style={{ fontFamily: FONTS.Regular }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
    width: "50%",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    gap: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: RFValue(11),
    fontFamily: FONTS.Regular,
  },
  inputBox: {
    width: RFValue(15),
    height: RFValue(15),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoundOTPInput;
