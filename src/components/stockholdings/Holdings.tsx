import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  useColorScheme,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Tabs } from "react-native-collapsible-tab-view";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import HoldingCard from "./HoldingCard";
import HoldingList from "./HoldingList";
import NoHoldingLight from "../../assets/images/no_holding_light.png";
import NoHoldingDark from "../../assets/images/no_holding_dark.png";
import { screenHeight, screenWidth } from "../../utils/Scaling";

const Holdings = () => {
  const [refereshing, setRefreshing] = useState(false);
  const refreshHandler = async () => {
    setRefreshing(false);
  };

  const theme = useColorScheme();

  return (
    <Tabs.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
      refreshControl={
        <RefreshControl
          onRefresh={refreshHandler}
          refreshing={refereshing}
          colors={[Colors.profit]}
          tintColor={Colors.profit}
        />
      }
    >
      {true ? (
        <>
          <CustomText
            variant="h6"
            style={styles.sectionContainer}
            fontFamily={FONTS.Medium}
          >
            Holdings (2)
          </CustomText>
          <HoldingCard />
          <HoldingList />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={theme === "dark" ? NoHoldingDark : NoHoldingLight}
              style={styles.img}
            />
          </View>
          <CustomText
            variant="h5"
            style={styles.subText}
            fontFamily={FONTS.Medium}
          >
            You have no holdings
          </CustomText>
          <CustomText variant="h8" fontFamily={FONTS.Regular}>
            Make your next investment
          </CustomText>
        </View>
      )}
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 15,
    marginTop: 16,
    paddingRight: 4,
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  imageContainer: {
    height: screenHeight * 0.25,
    width: screenWidth * 0.8,
  },
  subText: {
    marginVertical: 25,
    marginTop: 30,
  },
  emptyContainer: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Holdings;
