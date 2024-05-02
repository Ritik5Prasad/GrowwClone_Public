import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { normalizeWidth } from "../../utils/Scaling";
import { useTheme } from "@react-navigation/native";
import {
  formatPaisaWithCommas,
  getSignPaisa,
} from "../../utils/NumberUtils";
import { holdingsData } from "../../utils/staticData";

const HoldingCard = () => {
  const { colors } = useTheme();

  const totalReturns = holdingsData.reduce(
    (total, { invested, current }) => total + (current - invested),
    0
  );
  const dayReturns = holdingsData.reduce(
    (total, { dayReturn }) => total + dayReturn,
    0
  );
  const totalInvested = holdingsData.reduce(
    (total, { invested }) => total + invested,
    0
  );
  const totalCurrent = holdingsData.reduce(
    (total, { current }) => total + current,
    0
  );

  const totalReturnsPercentageChange = Math.abs(
    (totalReturns / totalInvested) * 100
  ).toFixed(2);
  const dayReturnsPercentageChange = Math.abs(
    (dayReturns / totalInvested) * 100
  ).toFixed(2);

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
            Current
          </CustomText>
          <CustomText
            variant="h8"
            style={{ marginTop: 2 }}
            fontFamily={FONTS.Medium}
          >
            {formatPaisaWithCommas(totalCurrent)}
          </CustomText>
        </View>
        <View>
          <CustomText
            variant="h9"
            style={{ textAlign: "right" }}
            fontFamily={FONTS.Regular}
          >
            Total Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(totalReturns).color,
            }}
            fontFamily={FONTS.Medium}
          >
            {getSignPaisa(totalReturns).paisa} ({totalReturnsPercentageChange}%)
          </CustomText>
        </View>
      </View>

      <View style={styles.flexRowCenter2}>
        <View>
          <CustomText variant="h9" fontFamily={FONTS.Regular}>
            Invested
          </CustomText>
          <CustomText
            variant="h8"
            style={{ marginTop: 2 }}
            fontFamily={FONTS.Medium}
          >
            {formatPaisaWithCommas(totalInvested)}
          </CustomText>
        </View>
        <View>
          <CustomText
            variant="h9"
            style={{ textAlign: "right" }}
            fontFamily={FONTS.Regular}
          >
            1D Returns
          </CustomText>
          <CustomText
            variant="h8"
            style={{
              marginTop: 2,
              color: getSignPaisa(dayReturns).color,
            }}
            fontFamily={FONTS.Medium}
          >
            {getSignPaisa(dayReturns).paisa} ({dayReturnsPercentageChange}%)
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 15,
    marginTop: 16,
    paddingRight: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  holdingsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: normalizeWidth(120),
    borderWidth: Platform.OS === "android" ? 1 : 0.5,
    marginBottom: normalizeWidth(13),
    borderRadius: 6,
  },
});

export default HoldingCard;
