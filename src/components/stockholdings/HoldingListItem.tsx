import React, { FC, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";
import { formatPaisaWithCommas, getSignPaisa } from "../../utils/NumberUtils";
import MiniChart from "../charts/MiniChart";
import { useWS } from "../../utils/WSProvider";

interface HoldingListItemProps {
  item: Record<string, any>;
}

type Stock = {
  __v: number;
  _id: string;
  companyName: string;
  currentPrice: number;
  iconUrl: string;
  lastDayTradedPrice: number;
  symbol: string;
  dayTimeSeries: Array<TimeSeries>;
  tenMinTimeSeries: Array<TimeSeries>;
};

type TimeSeries = {
  _internal_originalTime: number;
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  timestamp: string;
};

const HoldingListItem: FC<HoldingListItemProps> = ({ item }) => {
  const { colors } = useTheme();
  const [stockSocketData, setStockSocketData] = useState<Stock | null>(null);
  const socketService = useWS();

  const invested = useMemo(
    () => item.buyPrice * item.quantity,
    [item.buyPrice, item.quantity]
  );
  const currentStockPrice =
    stockSocketData?.currentPrice ?? item.stock.currentPrice;
  const currentValue = useMemo(
    () => currentStockPrice * item.quantity,
    [currentStockPrice, item.quantity]
  );
  const isProfit = useMemo(
    () => currentValue - invested,
    [currentValue, invested]
  );

  const scalingFactor = 0.2;

  useEffect(() => {
    if (socketService) {
      socketService.emit("subscribeToStocks", item.stock.symbol);

      socketService.on(item.stock.symbol, (data: Stock) => {
        setStockSocketData(data);
      });

      return () => {
        socketService.off(item.stock.symbol);
      };
    }
  }, [item.stock.symbol, socketService]);

  const scaledCloseValues =
    stockSocketData?.dayTimeSeries
      ?.slice(-14)
      ?.map((item) => Number((item.close * scalingFactor).toFixed(2)))
      ?.filter(
        (_, index, array) => index % Math.floor(array.length / 14) === 0
      ) || [];

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={{ width: "40%" }}>
        <CustomText variant="h8" fontFamily={FONTS.Medium}>
          {item.stock.companyName}
        </CustomText>
        <CustomText
          style={{ opacity: 0.7, marginVertical: 5 }}
          variant="h9"
          fontFamily={FONTS.Medium}
        >
          {item.quantity} shares
        </CustomText>
      </View>

      {scaledCloseValues && scaledCloseValues.length > 0 && (
        <MiniChart
          stockData={scaledCloseValues}
          color={getSignPaisa(isProfit).color}
        />
      )}
      <View style={{ alignItems: "flex-end" }}>
        <CustomText
          variant="h8"
          fontFamily={FONTS.Medium}
          style={{ color: getSignPaisa(isProfit).color }}
        >
          {getSignPaisa(isProfit).paisa.slice(0, 1) +
            getSignPaisa(currentValue).paisa.slice(1)}
        </CustomText>

        <CustomText
          style={{ opacity: 0.7, marginVertical: 5 }}
          variant="h9"
          fontFamily={FONTS.Medium}
        >
          ({formatPaisaWithCommas(invested)})
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
