import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";
import {
  formatNumberWithCommas,
  getSignPaisa,
  getSignText,
} from "../../utils/NumberUtils";
import { FONTS } from "../../constants/Fonts";
import { goBack } from "../../utils/NavigationUtil";

interface StockDetailProps {
  stock: Record<string, any>;
  isVisible: boolean;
}

const StockDetailHeader: FC<StockDetailProps> = ({ stock, isVisible }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: isVisible ? 2 : 0,
          borderColor: colors.notification,
        },
      ]}
    >
      <View style={styles.flexRow}>
        <Icon
          name="arrow-back"
          onPress={() => goBack()}
          color={colors.text}
          size={RFValue(18)}
        />
        {isVisible && (
          <View>
            <CustomText variant="h8" fontFamily={FONTS.Medium}>
              {stock?.name}
            </CustomText>
            <CustomText
              fontFamily={FONTS.Medium}
              variant="h9"
              style={{
                marginTop: 4,
              }}
            >
              {formatNumberWithCommas(stock?.current_price)}{" "}
              <CustomText
                variant="h9"
                fontFamily={FONTS.Medium}
                style={{ color: getSignPaisa(stock?.price_change).color }}
              >
                {getSignText(stock?.price_change)} ({stock?.percentage_change})
              </CustomText>
            </CustomText>
          </View>
        )}
      </View>
      {isVisible && (
        <View style={styles.flexRow}>
          <Icon name="access-alarm" color={colors.text} size={RFValue(18)} />
          <Icon
            name="bookmark-outline"
            color={colors.text}
            size={RFValue(18)}
          />
          <Icon name="search" color={colors.text} size={RFValue(18)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    height: 50,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
export default StockDetailHeader;
