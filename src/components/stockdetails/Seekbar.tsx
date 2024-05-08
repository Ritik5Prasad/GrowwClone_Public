import { View, StyleSheet, Animated } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import Point from "./Point";

interface SeekbarProps {
  leftText: string;
  leftPoint: number;
  rightText: string;
  rightPoint: number;
  position: number;
}

const Seekbar: FC<SeekbarProps> = ({
  leftPoint,
  leftText,
  rightPoint,
  rightText,
  position,
}) => {
  const { colors } = useTheme();
  const iconPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(iconPosition, {
      toValue: position,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [leftPoint, rightPoint, position]);

  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <Point label={leftText} point={leftPoint} />
        <Point label={rightText} point={rightPoint} rightEnd />
      </View>
      <View style={styles.seekBarContainer}>
        <View
          style={[styles.seekBar, { backgroundColor: colors.notification }]}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                left: iconPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "95%"],
                }),
              },
            ]}
          >
            <Icon
              name="caret-up-sharp"
              color={colors.text}
              size={RFValue(14)}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seekBar: {
    height: 2.5,
    overflow: "visible",
  },
  seekBarContainer: {
    marginVertical: 10,
  },
  flexRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    marginVertical: 10,
  },
  iconContainer: {
    position: "absolute",
    top: -1,
  },
});

export default Seekbar;
