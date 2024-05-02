import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";
import { Colors } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";

const NoInternet = () => {
  const theme = useColorScheme();
  const { colors } = useTheme();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!isConnected && (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <View
            style={[
              styles.subContainer,
              {
                backgroundColor:
                  theme === "dark"
                    ? Colors.dark_background_light
                    : Colors.light_sub_background,
              },
            ]}
          >
            <Icon name="wifi-off" size={RFValue(20)} color={colors.text} />
            <View>
              <CustomText variant="h7" fontFamily={FONTS.Medium}>
                Low Internet
              </CustomText>
              <CustomText
                variant="h8"
                fontFamily={FONTS.Medium}
                style={styles.bottomText}
              >
                Check your network connection
              </CustomText>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  subContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    width: "100%",
  },
  bottomText: {
    opacity: 0.6,
    marginTop: 3,
  },
});

export default NoInternet;
