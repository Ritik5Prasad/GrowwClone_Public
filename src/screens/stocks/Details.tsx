import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";
import {
  formatNumberWithCommas,
  getSignPaisa,
  getSignText,
} from "../../utils/NumberUtils";

interface DetailsProps {
  data: Record<string, any>;
}

const Details: FC<DetailsProps> = ({ data }) => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={styles.flexRowBetween}>
        <Image source={{ uri: data?.icon_url }} style={styles.icon} />

        <View style={styles.flexRow}>
          <Icon name="access-alarm" color={colors.text} size={RFValue(18)} />
          <Icon
            name="bookmark-outline"
            color={colors.text}
            size={RFValue(18)}
          />
          <Icon name="search" color={colors.text} size={RFValue(18)} />
        </View>
      </View>
      <CustomText style={styles.nameText}>{data?.name}</CustomText>
      <View style={styles.flexRowBetween}>
        <View>
          <CustomText variant="h4" fontFamily={FONTS.Medium}>
            {formatNumberWithCommas(data?.current_price)}
          </CustomText>
          <CustomText
            variant="h9"
            style={{
              marginTop: 10,
              color: getSignPaisa(data?.price_change).color,
            }}
            fontFamily={FONTS.Medium}
          >
            {getSignText(data?.price_change)} ({data?.percentage_change}){"  "}
            <CustomText
              variant="h9"
              style={{
                marginTop: 10,
                opacity: 0.7,
              }}
              fontFamily={FONTS.Medium}
            >
              1D
            </CustomText>
          </CustomText>
        </View>
        <TouchableOpacity
          style={[
            styles.flexRowBetween,
            {
              backgroundColor: colors.card,
              gap: 5,
              padding: 8,
              paddingHorizontal: 12,
              borderRadius: 50,
            },
          ]}
        >
          <Icon name="link" color={colors.primary} size={RFValue(12)} />
          <CustomText
            variant="h9"
            fontSize={8}
            fontFamily={FONTS.Medium}
            style={{ color: colors.primary }}
          >
            Option Chain
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 35,
  },
  nameText: {
    marginVertical: 10,
  },
  icon: {
    width: RFValue(32),
    height: RFValue(32),
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 5,
  },
});

export default Details;
