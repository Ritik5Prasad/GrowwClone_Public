import { View, StyleSheet, Platform } from "react-native";
import React, { FC } from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";
import {
  formatPaisaWithCommas,
  getSignPaisa,
  getSignText,
} from "../../utils/NumberUtils";
import MiniChart from "../charts/MiniChart";

interface WatchListItemProps {
  item: Record<string, any>;
}

const WatchListItem: FC<WatchListItemProps> = ({ item }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={{ width: "40%" }}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          {item.stock_name}
        </CustomText>
      </View>
      <MiniChart
        stockData={item.stockData}
        color={getSignPaisa(item.price_change).color}
      />
      <View style={{ alignItems: "flex-end" }}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          {formatPaisaWithCommas(item.current_price)}
        </CustomText>

        <CustomText
          style={{
            marginVertical: 5,
            color: getSignPaisa(item.price_change).color,
          }}
          variant="h9"
          fontFamily={FONTS.Bold}
        >
          {getSignText(item.price_change)} ({item.percentage_change})
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

export default WatchListItem;
