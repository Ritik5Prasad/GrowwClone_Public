import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/Colors";
import Seekbar from "./Seekbar";
import Point from "./Point";
import EtcData from "./EtcData";

const Overview = () => {
  return (
    <View>
      <View style={styles.flexRow}>
        <CustomText variant="h5" fontFamily={FONTS.Medium}>
          Performance
        </CustomText>
        <Icon name="info" size={RFValue(16)} color={Colors.unactive_tab} />
      </View>

      <Seekbar
        leftPoint={42241.23}
        rightPoint={45241.23}
        leftText="Today's low"
        position={0.2}
        rightText="Today's high"
      />
      <Seekbar
        leftPoint={42241.23}
        rightPoint={48241.23}
        leftText="52 Week low"
        position={0.7}
        rightText="52 Week high"
      />

      <View style={styles.flexRowEvenly}>
        <Point label="Open" point={42424.24} />
        <Point label="Prev. close" point={42424.24} />
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
    justifyContent: "flex-start",
    gap: 100,
  },
});

export default Overview;
