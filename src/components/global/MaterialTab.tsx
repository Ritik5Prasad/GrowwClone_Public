import React, { FC } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface MaterialTabProps {
  focused: boolean;
  onPress: () => void;
  label: string;
}

const MaterialTab: FC<MaterialTabProps> = ({ focused, onPress, label }) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnTab,
        {
          borderBottomWidth: focused ? 2 : 0,
          borderColor: Colors.profit,
        },
      ]}
      onPress={onPress}
    >
      <CustomText
        style={{ opacity: focused ? 1 : 0.6 }}
        fontSize={RFPercentage(1.5)}
        fontFamily={FONTS.Medium}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTab: {
    padding: 10,
    paddingBottom: 8,
  },
});

export default MaterialTab;
