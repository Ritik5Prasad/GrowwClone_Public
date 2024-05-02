import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const GlobalStyles = StyleSheet.create({
  bottomBtn: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    right: 0,
    left: 20,
  },
  tabIcon: {
    width: RFValue(18),
    height: RFValue(18),
  },
});
