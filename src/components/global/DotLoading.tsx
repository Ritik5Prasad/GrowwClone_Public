import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const DotLoading = () => {
  const [animatedValues] = useState(
    Array.from({ length: 4 }, () => new Animated.Value(1))
  );
  const { colors } = useTheme();
  useEffect(() => {
    startAnimation();
    return () => resetAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValues.map((val) =>
          Animated.sequence([
            Animated.timing(val, {
              toValue: 0.5,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(val, {
              toValue: 1,
              duration: 200,
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

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: colors.text,
              transform: [{ scale: animatedValue }],
              marginRight: index !== 3 ? 10 : 0,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: RFValue(15),
    height: RFValue(15),
    borderRadius: 55,
  },
});

export default DotLoading;
