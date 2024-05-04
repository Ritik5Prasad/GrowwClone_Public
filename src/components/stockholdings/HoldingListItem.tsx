import { View, Text, StyleSheet, Platform } from "react-native";
import React, { FC } from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";
import { formatPaisaWithCommas, getSignPaisa } from "../../utils/NumberUtils";
import MiniChart from "../charts/MiniChart";

interface HoldingListItemProps {
  item: Record<string, any>;
}

const HoldingListItem: FC<HoldingListItemProps> = ({ item }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={{ width: "40%" }}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          {item.stock_name}
        </CustomText>
        <CustomText
          style={{ opacity: 0.7, marginVertical: 5 }}
          variant="h9"
          fontFamily={FONTS.Medium}
        >
          {item.noOfShares} shares
        </CustomText>
      </View>

      <MiniChart
        stockData={item.stockData}
        color={getSignPaisa(item.current - item.invested).color}
      />

      <View style={{ alignItems: "flex-end" }}>
        <CustomText
          variant="h8"
          fontFamily={FONTS.Medium}
          style={{ color: getSignPaisa(item.current - item.invested).color }}
        >
          {getSignPaisa(item.current - item.invested).paisa.slice(0, 1) +
            getSignPaisa(item.current).paisa.slice(1)}
        </CustomText>

        <CustomText
          style={{ opacity: 0.7, marginVertical: 5 }}
          variant="h9"
          fontFamily={FONTS.Medium}
        >
          ({formatPaisaWithCommas(item.invested)})
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: Platform.OS === "android" ? 1 : 0.5,
  },
});
export default HoldingListItem;
