import { View } from "react-native";
import React from "react";
import TabHeader from "../dashboard/TabHeader";
import FNOIndexes from "./FNOIndexes";
import { useTheme } from "@react-navigation/native";

const StockHeader = () => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <TabHeader title="Stocks" />
      <FNOIndexes />
    </View>
  );
};

export default StockHeader;
