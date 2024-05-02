import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Logo from "../../assets/images/logo.png";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@react-navigation/native";
import UserAvatar from "./UserAvatar";

interface TabProps {
  title: string;
}

const TabHeader: FC<TabProps> = ({ title }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.flexRowCenter}>
        <Image source={Logo} style={styles.img} />
        <CustomText fontFamily={FONTS.Medium} fontSize={RFValue(10)}>
          {title}
        </CustomText>
      </View>
      <View style={styles.flexRowCenter}>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="search"
            color={colors.text}
            style={styles.icon}
            size={RFValue(18)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="qr-code"
            color={colors.text}
            style={styles.icon}
            size={RFValue(18)}
          />
        </TouchableOpacity>
        <UserAvatar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowCenter: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: RFValue(12),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    width: RFValue(24),
    height: RFValue(24),
    resizeMode: "cover",
  },
});

export default TabHeader;
