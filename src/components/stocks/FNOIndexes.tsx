import React, { FC } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { FnoIndexesData } from "../../utils/staticData";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { normalizeModerately } from "../../utils/Scaling";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatNumberWithCommas, getSignText } from "../../utils/NumberUtils";
import { navigate } from "../../utils/NavigationUtil";

interface FNOIndexesProp {
  item: {
    id: number;
    name: string;
    symbol: string;
    current_price: number;
    percentage_change: string;
    price_change: number;
  };
}

const FNOIndexes: FC = () => {
  const { colors } = useTheme();

  const renderFNOIndex = ({ item }: FNOIndexesProp) => {
    let isProfit = item?.price_change < 0 ? Colors.errorColor : Colors.profit;
    let isNeutral = item?.price_change === 0;

    if (item.name === "Button") {
      return (
        <TouchableOpacity
          style={[styles.indexContainer, { borderColor: colors.border }]}
          activeOpacity={0.6}
        >
          <View style={styles.flexRowCenter}>
            <CustomText variant="h9" fontFamily={FONTS.Medium}>
              All Indices{" "}
            </CustomText>
            <Icon name="chevron-right" size={RFValue(10)} color={colors.text} />
          </View>
          <CustomText
            variant="h9"
            style={styles.buttonSubText}
            fontFamily={FONTS.Regular}
          >
            Indian and global
          </CustomText>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.indexContainer, { borderColor: colors.border }]}
        activeOpacity={0.6}
        onPress={() =>
          navigate("StockDetail", {
            stock: item,
          })
        }
      >
        <CustomText variant="h9" fontFamily={FONTS.Medium}>
          {item.name}
        </CustomText>
        <CustomText
          variant="h9"
          style={styles.subText}
          fontFamily={FONTS.Regular}
        >
          {formatNumberWithCommas(item.current_price)}{" "}
          <CustomText
            fontSize={RFValue(7)}
            fontFamily={FONTS.Medium}
            style={{
              color: isNeutral ? colors.text : isProfit,
              fontWeight: "700",
            }}
          >
            {getSignText(item.price_change)} ({item.percentage_change})
          </CustomText>
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={FnoIndexesData}
      renderItem={renderFNOIndex}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{
        marginTop: normalizeModerately(18),
        marginBottom: normalizeModerately(10),
        alignSelf: "flex-start",
        paddingHorizontal: RFValue(12),
      }}
    />
  );
};

const styles = StyleSheet.create({
  subText: {
    marginTop: 5,
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  indexContainer: {
    padding: 14,
    paddingHorizontal: 14,
    borderRadius: 5,
    borderWidth: Platform.OS === "android" ? 1 : 0.5,
    minWidth: 140,
    marginRight: 10,
  },
  buttonSubText: {
    marginTop: 5,
    opacity: 0.8,
  },
});

export default FNOIndexes;
