import {
  View,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@react-navigation/native";
import { watchlistData } from "../../utils/staticData";
import WatchListItem from "./WatchListItem";
import TouchableText from "../auth/TouchableText";
import { Tabs } from "react-native-collapsible-tab-view";
import { Colors } from "../../constants/Colors";

const Header = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <CustomText variant="h8" fontFamily={FONTS.Medium}>
            Sort
          </CustomText>
          <Icon name="sort" size={RFValue(11)} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.arrowIcon}>
            <Icon
              name="keyboard-arrow-left"
              size={RFValue(11)}
              color={colors.text}
            />
            <Icon
              name="keyboard-arrow-right"
              size={RFValue(11)}
              style={{ marginLeft: -5 }}
              color={colors.text}
            />
          </View>
          <CustomText variant="h8" fontFamily={FONTS.Medium}>
            Market Price
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Footer = () => {
  return (
    <View style={styles.flexRowBetween}>
      <TouchableText firstText="Edit Watchlist" />
      <TouchableText firstText="Add Stocks" />
    </View>
  );
};

const WatchList = () => {
  const [refereshing, setRefreshing] = useState(false);
  const refreshHandler = async () => {
    setRefreshing(false);
  };
  return (
    <Tabs.FlatList
      ListHeaderComponent={() => <Header />}
      data={watchlistData}
      refreshControl={
        <RefreshControl
          onRefresh={refreshHandler}
          refreshing={refereshing}
          colors={[Colors.profit]}
          tintColor={Colors.profit}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 15,marginTop:20,paddingBottom:40 }}
      ListFooterComponent={() => <Footer />}
      renderItem={({ item }) => <WatchListItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  container: {
    paddingHorizontal: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    opacity: 0.9,
  },
  arrowIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyHoldingText: {
    fontSize: RFValue(11),
    textAlign: "center",
    marginVertical: 30,
    fontFamily: FONTS.Medium,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
});
export default WatchList;
