import React, { FC, useEffect, useState, useCallback } from "react";
import { useTheme } from "@react-navigation/native";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { formatPaisaWithCommas, getSignText } from "../../utils/NumberUtils";
import { Colors } from "../../constants/Colors";
import { normalizeWidth } from "../../utils/Scaling";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { navigate } from "../../utils/NavigationUtil";
import { useWS } from "../../utils/WSProvider";

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

interface StockItemProps {
  item: any;
}

// Set to keep track of subscribed symbols
const subscribedSymbols = new Set<string>();

const StockItem: FC<StockItemProps> = React.memo(({ item }) => {
  const { colors } = useTheme();
  const socketService = useWS();
  const [stockData, setStockData] = useState<any>(null);

  useEffect(() => {
    if (socketService && item?.symbol) {
      if (!subscribedSymbols.has(item.symbol)) {
        socketService.emit("subscribeToStocks", item.symbol);
        subscribedSymbols.add(item.symbol);
      }

      socketService.on(item.symbol, (data) => {
        setStockData(data);
      });

      return () => {
        socketService.off(item.symbol);
        subscribedSymbols.delete(item.symbol);
      };
    }
  }, [item.symbol, socketService]);
  const handlePress = () => {
    const { tenMinTimeSeries, dayTimeSeries, ...stockWithoutTimeSeries } =
      item as Stock;
    navigate("StockDetail", { stock: stockWithoutTimeSeries });
  };

  const renderStockDetails = (stockData: any) => {
    const { companyName, currentPrice, lastDayTradedPrice, iconUrl } =
      stockData;
    const priceChange = currentPrice - lastDayTradedPrice;
    const percentageChange = Math.abs(
      (priceChange / lastDayTradedPrice) * 100
    ).toFixed(2);

    const isProfit = priceChange > 0 ? Colors.profit : Colors.errorColor;
    const isNeutral = priceChange === 0;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handlePress}
        style={[styles.itemContainer, { borderColor: colors.border }]}
      >
        <Image source={{ uri: iconUrl }} style={styles.img} />
        <CustomText numberOfLines={1} variant="h8" fontFamily={FONTS.Medium}>
          {companyName}
        </CustomText>
        <View style={styles.priceContainer}>
          <CustomText numberOfLines={1} variant="h8" fontFamily={FONTS.Medium}>
            {formatPaisaWithCommas(currentPrice)}
          </CustomText>
          <CustomText
            numberOfLines={1}
            variant="h9"
            style={{ color: isNeutral ? colors.text : isProfit, marginTop: 6 }}
            fontFamily={FONTS.Medium}
          >
            {getSignText(priceChange)} ({percentageChange}%)
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  if (item.name === "Gainers" || item.name === "Losers") {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.itemContainer, { borderColor: colors.border }]}
      >
        <View style={styles.seeMoreContainer}>
          <CustomText>See more</CustomText>
          <Icon
            size={RFValue(20)}
            color={colors.text}
            style={styles.seeMoreIcon}
            name="chevron-right"
          />
        </View>
        <CustomText
          variant="h9"
          fontFamily={FONTS.Medium}
          style={styles.seeMoreText}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  }

  return stockData ? renderStockDetails(stockData) : renderStockDetails(item);
});

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    width: "48%",
    height: normalizeWidth(120),
    borderWidth: Platform.OS === "android" ? 1 : 0.5,
    marginBottom: normalizeWidth(13),
    borderRadius: 6,
  },
  img: {
    width: 30,
    resizeMode: "cover",
    height: 30,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 5,
  },
  priceContainer: {
    marginTop: 20,
  },
  seeMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreIcon: {
    opacity: 0.6,
  },
  seeMoreText: {
    opacity: 0.6,
  },
});

export default StockItem;
