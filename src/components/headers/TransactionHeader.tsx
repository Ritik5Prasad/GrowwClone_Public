import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../global/CustomText";
import { formatNumberWithCommas } from "../../utils/NumberUtils";
import { FONTS } from "../../constants/Fonts";
import { goBack } from "../../utils/NavigationUtil";

interface StockDetailProps {
  stock: Record<string, any>;
}

const TransactionHeader: FC<StockDetailProps> = ({ stock }) => {
  const { colors } = useTheme();
  const priceChange = stock?.currentPrice - stock?.lastDayTradedPrice;
  const percentageChange = Math.abs(
    (priceChange / stock?.lastDayTradedPrice) * 100
  ).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Icon
          name="arrow-back"
          onPress={() => goBack()}
          color={colors.text}
          size={RFValue(18)}
        />

        <View>
          <CustomText variant="h8" fontFamily={FONTS.Medium}>
            {stock?.companyName}
          </CustomText>
          <CustomText
            fontFamily={FONTS.Medium}
            variant="h8"
            style={{
              marginTop: 4,
              opacity: 0.7,
            }}
          >
            {formatNumberWithCommas(stock?.currentPrice)}
            {"  "}
            <CustomText fontFamily={FONTS.Regular} variant="h9" style={{}}>
              ({percentageChange}) Depth
            </CustomText>
          </CustomText>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.card }]}
      >
        <Icon2 name="tune" color={colors.primary} size={RFValue(18)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 0,
    height: 50,
  },
  flexRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 6,
  },
});
export default TransactionHeader;
