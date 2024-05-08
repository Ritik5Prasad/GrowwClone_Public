import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";

interface DetailTabProps {
  focused: boolean;
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

const DetailTab: FC<DetailTabProps> = ({ focused, onPress, label, style }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.btnTab,
        {
          borderColor: focused ? colors.primary : colors.notification,
        },
        style,
      ]}
      onPress={onPress}
    >
      <CustomText
        style={{
          color: focused ? colors.primary : colors.text,
          opacity: focused ? 1 : 0.7,
        }}
        variant="h8"
        fontFamily={FONTS.Regular}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTab: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 2.5,
  },
});

export default DetailTab;
