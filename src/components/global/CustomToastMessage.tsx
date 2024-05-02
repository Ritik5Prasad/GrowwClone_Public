import React from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";
import { Colors } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  type: string;
  msg: string;
}

function CustomToastMessage({ type, msg }: Props) {
  let bgColor = `${Colors.dark_background_light}`;
  let textColor = Colors.dark_text;

  switch (type) {
    case "warningToast":
      bgColor = "#fcba03";
      textColor = Colors.light_text;
      break;
    default:
      break;
  }

  return (
    <Animated.View style={[styles.modal, { backgroundColor: bgColor }]}>
      <View style={styles.subContainer}>
        {type == "successToast" && (
          <Icon
            name="checkmark-circle-sharp"
            size={RFValue(16)}
            color={Colors.themeColor}
          />
        )}
        <CustomText
          style={{ color: textColor }}
          variant="h7"
          fontFamily={FONTS.Medium}
        >
          {msg}
        </CustomText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap:10,
  },
  text: {
    color: Colors.dark_text,
  },
  modal: {
    paddingTop: 16,
    paddingBottom: Platform.OS==='ios' ? RFPercentage(4) : 16,
    paddingHorizontal: RFPercentage(3),
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CustomToastMessage;
