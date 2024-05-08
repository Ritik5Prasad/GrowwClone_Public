import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import TouchableText from "../auth/TouchableText";
import CustomText from "../global/CustomText";
import { useTheme } from "@react-navigation/native";
import LineIcon from "../../assets/images/line_chart.png";
import CandleIcon from "../../assets/images/candle_chart.png";
import { RFValue } from "react-native-responsive-fontsize";

interface TimeFrameProps {
  chartMode: string;
  currentTimeFrame: string;
  onSetChartMode: (type: string) => void;
  onSetCurrentTimeFrame: (type: string) => void;
}
const frameData = ["1D", "1W", "1M", "1Y", "5Y", "ALL"];

const TimeFrame: FC<TimeFrameProps> = ({
  chartMode,
  currentTimeFrame,
  onSetChartMode,
  onSetCurrentTimeFrame,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.flexRowBetween}>
      <TouchableText firstText="BSE" style={{ fontSize: RFValue(9) }} />
      {frameData?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSetCurrentTimeFrame(item)}
            style={{
              padding: 5,
              paddingHorizontal: 15,
              backgroundColor:
                currentTimeFrame == item ? colors.card : "transparent",
              borderRadius: 50,
            }}
          >
            <CustomText
              variant="h9"
              style={{
                color: currentTimeFrame == item ? colors.primary : colors.text,
                opacity: 0.8,
              }}
            >
              {item}
            </CustomText>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          onSetChartMode(chartMode == "line" ? "candle" : "line");
        }}
      >
        <Image
          source={chartMode == "line" ? CandleIcon : LineIcon}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical:10
  },
  img: {
    width: RFValue(18),
    height: RFValue(18),
    resizeMode: "contain",
  },
});

export default TimeFrame;
