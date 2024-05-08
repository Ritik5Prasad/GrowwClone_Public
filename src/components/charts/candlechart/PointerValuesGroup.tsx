import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import CustomText from "../../global/CustomText";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { ReText } from "react-native-redash";
import { normalizeHeight } from "../../../utils/Scaling";

interface PointerValuesProps {
  label: string;
  value: any;
}

const PointerValues: React.FC<PointerValuesProps> = ({ label, value }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.pointerContainer}>
      <CustomText
        style={{ opacity: 0.8 }}
        variant="h8"
        fontFamily={FONTS.Regular}
      >
        {label}
      </CustomText>
      <ReText
        style={{
          color: colors.text,
          fontFamily: FONTS.Medium,
          fontSize: RFValue(10),
        }}
        {...{ text: value }}
      />
    </View>
  );
};

interface PointerValuesGroupProps {
  openValue: any;
  closeValue: any;
  highValue: any;
  lowValue: any;
}

const PointerValuesGroup: React.FC<PointerValuesGroupProps> = ({
  openValue,
  closeValue,
  highValue,
  lowValue,
}) => {
  return (
    <View>
      <View style={styles.flexRow}>
        <PointerValues label="Open" value={openValue} />
        <PointerValues label="Close" value={closeValue} />
      </View>
      <View style={styles.flexRow2}>
        <PointerValues label="High" value={highValue} />
        <PointerValues label="Low" value={lowValue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "46%",
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexRow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Platform.OS === "ios" ? 40 : normalizeHeight(20),
  },
});
export default PointerValuesGroup;
