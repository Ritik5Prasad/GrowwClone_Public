import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { formatPaisaWithCommas, getSignText } from "../../utils/NumberUtils";
import { Colors } from "../../constants/Colors";
import { normalizeWidth } from "../../utils/Scaling";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";

interface StockItem {
  item: any;
}
interface StockCardProps {
  data: Record<string, any>;
}

const StockItem: FC<StockItem> = ({ item }) => {
  const { colors } = useTheme();
  let isProfit = item.price_change < 0 ? Colors.errorColor : Colors.profit;
  let isNeutral = item.price_change === 0;

  if (item.name == "Gainers" || item.name == "Losers") {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.itemContainer, { borderColor: colors.border }]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText>See more</CustomText>
          <Icon
            size={RFValue(20)}
            color={colors.text}
            style={{ opacity: 0.6 }}
            name="chevron-right"
          />
        </View>
        <CustomText
          variant="h9"
          fontFamily={FONTS.Medium}
          style={{ opacity: 0.6 }}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.itemContainer, { borderColor: colors.border }]}
    >
      <Image source={{ uri: item.icon_url }} style={styles.img} />
      <CustomText numberOfLines={1} variant="h8" fontFamily={FONTS.Medium}>
        {item.name}
      </CustomText>
      <View style={{ marginTop: 20 }}>
        <CustomText numberOfLines={1} variant="h8" fontFamily={FONTS.Medium}>
          {formatPaisaWithCommas(item.current_price)}
        </CustomText>
        <CustomText
          numberOfLines={1}
          variant="h9"
          style={{ color: isNeutral ? colors.text : isProfit, marginTop: 6 }}
          fontFamily={FONTS.Medium}
        >
          {getSignText(item.price_change)} ({item.percentage_change})
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const StockCard: FC<StockCardProps> = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        {data.slice(0, 2).map((item: any, index: number) => {
          return <StockItem key={index} item={item} />;
        })}
      </View>
      <View style={styles.container}>
        {data.slice(2, 4).map((item: any, index: number) => {
          return <StockItem key={index} item={item} />;
        })}
      </View>
    </View>
  );
};

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
    resizeMode: "contain",
    height: 30,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default StockCard;
