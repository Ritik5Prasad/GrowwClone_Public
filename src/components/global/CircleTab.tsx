import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";

interface CircleTabProps {
  focused: boolean;
  onPress: () => void;
  label: string;
}

const CircleTab: FC<CircleTabProps> = ({ focused, onPress, label }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.btnTab,
        {
         
          borderColor: focused ? colors.text : colors.border,
          backgroundColor: focused ? colors.card : colors.background,
        },
      ]}
      onPress={onPress}
    >
      <CustomText
        style={{ opacity: focused ? 1 : 0.6 }}
        variant="h9"
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
    marginRight: 10,
    marginVertical: 15,
    borderWidth: Platform.OS==='android'  ? 1 : 0.5,
    borderRadius: 20,
  },
});

export default CircleTab;
