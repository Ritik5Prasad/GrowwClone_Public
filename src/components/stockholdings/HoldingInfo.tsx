import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { normalizeWidth } from "../../utils/Scaling";

interface HoldingInfoProp {
  label: string;
  value: string;
}

const HoldingInfo: FC<HoldingInfoProp> = ({ label, value }) => {
  return (
    <View style={styles.infoContainer}>
      <CustomText variant="h9" fontFamily={FONTS.Regular}>
        {label}
      </CustomText>
      <CustomText
        variant="h8"
        style={{ marginTop: 2 }}
        fontFamily={FONTS.Medium}
      >
        {value}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
  },
});

export default HoldingInfo;
