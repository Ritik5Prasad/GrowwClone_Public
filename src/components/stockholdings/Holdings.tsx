import { View, RefreshControl, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Tabs } from "react-native-collapsible-tab-view";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import HoldingCard from "./HoldingCard";
import HoldingList from "./HoldingList";
import NoHoldingLight from "../../assets/images/no_holding_light.png";
import NoHoldingDark from "../../assets/images/no_holding_dark.png";
import { screenHeight, screenWidth } from "../../utils/Scaling";
import { useCustomColorScheme } from "../../navigation/Theme";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { selectHoldings } from "../../redux/reducers/stockSlice";
import { getAllHoldings } from "../../redux/actions/stockAction";

const Holdings = () => {
  const dispatch = useAppDispatch();
  const holdingData = useAppSelector(selectHoldings);
  const fetchHoldings = async () => {
    await dispatch(getAllHoldings());
  };
  const [refereshing, setRefreshing] = useState(false);
  const refreshHandler = async () => {
    fetchHoldings();
    setRefreshing(false);
  };

  const theme = useCustomColorScheme();

  useEffect(() => {
    fetchHoldings();
  }, []);

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
      {holdingData.length != 0 ? (
        <>
          <CustomText
            variant="h6"
            style={styles.sectionContainer}
            fontFamily={FONTS.Medium}
          >
            Holdings ({holdingData.length})
          </CustomText>
          <HoldingCard data={holdingData} />
          <HoldingList data={holdingData} />
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
