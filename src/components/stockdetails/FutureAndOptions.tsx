import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/Colors";
import Point from "./Point";
import EtcData from "./EtcData";

const FutureAndOption = () => {
  return (
    <View>
      <View style={styles.flexRow}>
        <CustomText variant="h5" fontFamily={FONTS.Medium}>
          Open Interest (OI)
        </CustomText>
        <Icon name="info" size={RFValue(16)} color={Colors.unactive_tab} />
      </View>

      <View style={styles.flexRowEvenly}>
        <Point label="Total Put OI" point={2532274} />
        <Point label="Put:Call ratio" point={0.64} />
        <Point label="Total Call OI" point={3926477} />
      </View>
      <EtcData />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  flexRowEvenly: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});

export default FutureAndOption;
