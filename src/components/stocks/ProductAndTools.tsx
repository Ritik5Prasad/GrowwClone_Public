import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../global/CustomText";
import { ProductAndToolsData } from "../../utils/staticData";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../constants/Fonts";
import { useCustomColorScheme } from "../../navigation/Theme";

const ProductAndTools = () => {
  const { colors } = useTheme();
  const theme = useCustomColorScheme();
  const tabstyle = {
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.notification,
    marginBottom: 10,
  };
  return (
    <View style={styles.container}>
      {ProductAndToolsData.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={styles.itemContainer}
          >
            <View style={tabstyle}>
              {theme === "dark" ? item.dark_icon : item.light_icon}
            </View>
            <CustomText variant="h8" fontFamily={FONTS.Medium}>
              {item.name}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
export default ProductAndTools;
