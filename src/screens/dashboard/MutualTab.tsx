import React, { FC } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomText from "../../components/global/CustomText";

const MutualTab: FC = () => {
  return (
    <CustomSafeAreaView>
      <CenteredLogo />
      <CustomText>Mutual Tab</CustomText>
    </CustomSafeAreaView>
  );
};

export default MutualTab;
