import React, { FC } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import Lottie from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import Anim from "../../assets/animations/confirm.json";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";
import CustomButton from "../../components/global/CustomButton";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
interface ParamsType {
  msg?: string;
}
const TransactionSuccess: FC = () => {
  const route = useRoute<RouteProp<ParamListBase>>();

  const msg = (route.params as ParamsType)?.msg || null;

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <Lottie
            source={Anim}
            speed={0.9}
            loop={false}
            style={styles.animation}
            autoPlay
          />
          <CustomText variant="h4" fontFamily={FONTS.Bold}>
            Order Successful
          </CustomText>
          <CustomText
            variant="h8"
            fontFamily={FONTS.Regular}
            style={{ marginTop: 20, textAlign: "center" }}
          >
            {msg}
          </CustomText>
        </View>
      </View>
      <View style={[styles.btnContainer]}>
        <CustomButton
          text={"Done"}
          onPress={() => {
            resetAndNavigate("BottomTab");
          }}
          loading={false}
          disabled={false}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  animationContainer: {
    height: 280,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: 120,
  },
  btnContainer: {
    justifyContent: "flex-end",
    flex: 0.2,
    padding: 10,
  },
});

export default TransactionSuccess;
