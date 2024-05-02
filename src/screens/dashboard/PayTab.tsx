import React, { FC } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomText from "../../components/global/CustomText";

const PayTab: FC = () => {
  return (
    <CustomSafeAreaView>
      <CenteredLogo />
      <CustomText>Pay Tab</CustomText>
    </CustomSafeAreaView>
  );
};

export default PayTab;
