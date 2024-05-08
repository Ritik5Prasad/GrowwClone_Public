import { useTheme } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import CustomText from "../../global/CustomText";
import { screenWidth } from "react-native-gifted-charts/src/utils";
import { formatPaisaWithCommas, hexToRGBA } from "../../../utils/NumberUtils";
import { ptData2 } from "../../../utils/staticData";
import { Colors } from "../../../constants/Colors";

interface Chart {
  height: number;
  color: string;
  data?: lineDataItem[];
}

const PointerChart: FC<Chart> = ({ height, data, color }) => {
  const { colors } = useTheme();
  const [measure, setMeasure] = useState<any>(null);
  const [labelWidth, setLabelWidth] = useState<number>(0);

  const handleTextLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setLabelWidth(width);
  };

  return (
    <LineChart
      lineGradient={false}
      data={data}
      onDataChangeAnimationDuration={1200}
      hideDataPoints
      secondaryData={ptData2}
      secondaryLineConfig={{
        strokeDashArray: [5, 5],
        thickness: 1,
        color: Colors.unactive_tab,
      }}
      onScroll={() => {
        console.log("Hey");
      }}
      onEndReached={() => {
        console.log("Hey");
      }}
      onMomentumScrollEnd={() => {
        console.log("Hey");
      }}
      getPointerProps={(props: any) => {
        setMeasure(props.pointerX);
      }}
      spacing={screenWidth * 0.026}
      color={color}
      thickness={2}
      hideAxesAndRules
      hideOrigin
      width={screenWidth}
      hideYAxisText
      hideRules
      backgroundColor={colors.background}
      initialSpacing={0}
      isAnimated
      animationDuration={1200}
      height={height}
      noOfSectionsBelowXAxis={0}
      showXAxisIndices={false}
      pointerConfig={{
        pointerStripHeight: height - 10,
        pointerStripColor: colors.text,
        pointerStripWidth: 1,
        persistPointer: true,
        shiftPointerLabelY: -12,
        resetPointerOnDataChange: false,
        hideSecondaryPointer:true,
        pointerStripUptoDataPoint: false,
        pointerComponent: (item: any) => {
          return (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 50,
                backgroundColor: hexToRGBA(color, 0.5),
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                alignSelf: "center",
                right: 3,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#fff",
                  backgroundColor: color,
                }}
              />
            </View>
          );
        },
        pointerLabelComponent: (items: any) => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                width: 200,
                left:
                  measure <= labelWidth / 3
                    ? labelWidth / 3
                    : measure >= screenWidth - labelWidth / 2
                    ? -labelWidth / 3
                    : 0,
              }}
            >
              <CustomText
                onLayout={handleTextLayout}
                style={{ textAlign: "center" }}
                variant="h9"
              >
                {formatPaisaWithCommas(items[0]?.value)} | {items[0].date}
              </CustomText>
            </View>
          );
        },
      }}
    />
  );
};

export default PointerChart;
