import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import CustomText from "../global/CustomText";
import { formatNumberWithCommas } from "../../utils/NumberUtils";
import { FONTS } from "../../constants/Fonts";

interface PointProps {
  label: string;
  point: number;
  rightEnd?: boolean;
}
const Point: FC<PointProps> = ({ label, point, rightEnd }) => {
  return (
    <View style={{ alignItems: rightEnd ? "flex-end" : "center" }}>
      <CustomText variant="h9" style={styles.label}>
        {label}
      </CustomText>
      <CustomText fontFamily={FONTS.Medium} variant="h8">
        {formatNumberWithCommas(point)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    opacity: 0.6,
    marginVertical: 10,
  },
});
export default Point;
