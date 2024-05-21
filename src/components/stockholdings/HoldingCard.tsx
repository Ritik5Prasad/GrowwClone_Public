import { View, StyleSheet, Platform } from "react-native";
import React, { FC, useEffect, useState, useCallback } from "react";
import { useTheme } from "@react-navigation/native";
import { normalizeWidth } from "../../utils/Scaling";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { formatPaisaWithCommas, getSignPaisa } from "../../utils/NumberUtils";
import { useWS } from "../../utils/WSProvider";

interface HoldingProps {
  data: Record<string, any>[];
}

const HoldingCard: FC<HoldingProps> = React.memo(({ data }) => {
  const { colors } = useTheme();
  const socketService = useWS();

  const [summary, setSummary] = useState({
    totalInvested: 0,
    totalCurrentValue: 0,
    totalLastDayValue: 0,
    totalReturns: 0,
    oneDayReturn: 0,
    totalReturnsPercentageChange: "",
    dayReturnsPercentageChange: "",
  });

  useEffect(() => {
    if (socketService && data.length > 0) {
      const symbols = data.map((holding) => holding.stock.symbol);
      socketService.emit("subscribeToMultipleStocks", symbols as any);

      const handleMultipleStocksData = (stocksData: any) => {
        updateSummary(stocksData);
      };

      socketService.on("multipleStocksData", handleMultipleStocksData);

      return () => {
        socketService.off("multipleStocksData");
      };
    }
  }, [socketService, data]);

  const updateSummary = useCallback(
    (stocksData: any) => {
      let totalInvested = 0;
      let totalCurrentValue = 0;
      let totalLastDayValue = 0;

      data.forEach((holding) => {
        const invested = holding.buyPrice * holding.quantity;
        const stockData = stocksData.find(
          (stock: any) => stock.symbol === holding.stock.symbol
        );
        if (stockData) {
          const currentValue = stockData.currentPrice * holding.quantity;
          const lastDayValue =
            invested - stockData.lastDayTradedPrice * holding.quantity;
          totalInvested += invested;
          totalCurrentValue += currentValue;
          totalLastDayValue += lastDayValue;
        }
      });

      const totalReturns = totalCurrentValue - totalInvested;
      const oneDayReturn = totalReturns - totalLastDayValue;

      const totalReturnsPercentageChange = (
        (totalReturns / totalInvested) *
        100
      ).toFixed(2);
      const dayReturnsPercentageChange = (
        (oneDayReturn / totalLastDayValue) *
        100
      ).toFixed(2);

      setSummary({
        totalInvested,
        totalCurrentValue,
        totalLastDayValue,
        totalReturns,
        oneDayReturn,
        totalReturnsPercentageChange,
        dayReturnsPercentageChange,
      });
    },
    [data]
  );

  return (
    <View
      style={[
        styles.holdingsContainer,
        {
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.flexRowCenter}>
        <View>
          <CustomText variant="h9" fontFamily={FONTS.Regular}>
            Current Value
          </CustomText>
          <CustomText variant="h8" style={styles.currentValueText}>
            {summary.totalCurrentValue
              ? formatPaisaWithCommas(summary.totalCurrentValue)
              : "-"}
          </CustomText>
        </View>

        <View>
          <CustomText
            variant="h9"
            style={styles.rightAlignedText}
            fontFamily={FONTS.Regular}
          >
            Total Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(summary.totalReturns).color,
            }}
          >
            {summary.totalReturns
              ? `${getSignPaisa(summary.totalReturns).paisa} (${
                  summary.totalReturnsPercentageChange
                }%)`
              : "-"}
          </CustomText>
        </View>
      </View>

      <View style={styles.flexRowCenter2}>
        <View>
          <CustomText variant="h9" fontFamily={FONTS.Regular}>
            Invested Amount
          </CustomText>
          <CustomText variant="h8" style={styles.investedAmountText}>
            {summary.totalInvested
              ? formatPaisaWithCommas(summary.totalInvested)
              : "-"}
          </CustomText>
        </View>

        <View>
          <CustomText
            variant="h9"
            style={styles.rightAlignedText}
            fontFamily={FONTS.Regular}
          >
            1-Day Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(summary.oneDayReturn).color,
            }}
          >
            {summary.oneDayReturn
              ? `${getSignPaisa(summary.oneDayReturn).paisa} (${
                  summary.dayReturnsPercentageChange
                }%)`
              : "-"}
          </CustomText>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  holdingsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: normalizeWidth(120),
    borderWidth: Platform.OS === "android" ? 1 : 0.5,
    marginBottom: normalizeWidth(13),
    borderRadius: 6,
  },
  flexRowCenter: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  flexRowCenter2: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  currentValueText: {
    marginTop: 2,
  },
  rightAlignedText: {
    textAlign: "right",
  },

  investedAmountText: {
    marginTop: 2,
  },
});

export default HoldingCard;
