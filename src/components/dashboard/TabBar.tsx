import React, { FC, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { screenWidth } from "../../utils/Scaling";

interface TabBarProps {
  tabNames: string[];
  focusedIndex: number;
  onSetIndex: (index: number) => void;
}

const TabBar: FC<TabBarProps> = ({ tabNames, focusedIndex, onSetIndex }) => {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      const itemWidth = 150;
      const itemCount = tabNames.length;
      const totalWidth = itemWidth * itemCount;

      const maxScrollX = Math.max(totalWidth - screenWidth, 0);
      const scrollToX = Math.min(
        focusedIndex * itemWidth - screenWidth / 2 + itemWidth / 2,
        maxScrollX
      );
      scrollViewRef.current.scrollTo({ x: scrollToX, animated: true });
    }
  }, [focusedIndex, tabNames]);

  const handleTabPress = (index: number) => {
    onSetIndex(index);
  };

  return (
    <View style={{ width: "100%", backgroundColor: colors.background }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {tabNames.map((name, index) => {
          const isFocused = focusedIndex === index;
          const isWatchlist = name === "+ Watchlist";
          const borderColor = isFocused ? colors.text : colors.border;
          const bgColor = isFocused ? colors.card : colors.background;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              onPress={() => handleTabPress(index)}
              style={[
                styles.btnStyle,
                { borderColor, backgroundColor: bgColor },
              ]}
            >
              <CustomText
                variant="h8"
                style={{
                  color: isFocused
                    ? colors.text
                    : isWatchlist
                    ? Colors.profit
                    : colors.text,
                }}
                fontFamily={FONTS.Medium}
              >
                {name}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: 6,
    padding: 10,
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: Platform.OS === "android" ? 1 : 0.5,
    paddingHorizontal: 15,
  },
});

export default TabBar;
