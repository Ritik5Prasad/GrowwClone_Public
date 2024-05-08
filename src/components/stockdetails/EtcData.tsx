import { View, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";

const EtcDataItem = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.itemContainer, { borderColor: colors.notification }]}>
      <CustomText variant="h7">Stock Data</CustomText>
      <CustomText variant="h9" style={{ opacity: 0.7, marginTop: 5 }}>
        Information about other Stock and fno details and info
      </CustomText>
    </View>
  );
};

const EtcData = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
        return <EtcDataItem key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 20,
    borderTopWidth: 2,
  },
  container: {
    marginTop: 40,
  },
});
export default EtcData;
