import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

interface LineProps {
  y: number;
}

const StripLine = ({ y }: LineProps) => {
  const { colors } = useTheme();
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Line y2={y} strokeWidth={1} stroke={colors.text} />
    </Svg>
  );
};

export default StripLine;
