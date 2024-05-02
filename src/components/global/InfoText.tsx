import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import CustomText from "./CustomText";
import { FONTS } from "../../constants/Fonts";

interface InfoTextProps {
  data: string[];
}

const InfoText: FC<InfoTextProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data?.map((item, index) => {
        return (
          <CustomText
            key={index}
            variant="h9"
            fontFamily={FONTS.Regular}
            style={styles.text}
          >
            {item}
          </CustomText>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    opacity: 0.7,
    textAlign: "center",
    marginBottom:5
  },
  container: {
    marginTop:25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoText;
