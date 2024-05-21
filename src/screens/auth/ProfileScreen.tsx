import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, useEffect } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import ProfileHeader from "../../components/headers/ProfileHeader";
import UserAvatar from "../../components/dashboard/UserAvatar";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { selectUser } from "../../redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { useTheme } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Logout, refetchUser } from "../../redux/actions/userAction";
import { toggleColorScheme } from "../../redux/reducers/themeSlice";
import { useCustomColorScheme } from "../../navigation/Theme";

interface ProfileItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
}

const ProfileItem: FC<ProfileItemProps> = ({
  icon,
  title,
  description,
  onPress,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refetchUser());
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.flexRow, { borderBottomWidth: 0, gap: 5 }]}
    >
      {icon}
      <View
        style={[
          styles.flexRowBetween,
          { width: "100%", borderColor: colors.border },
        ]}
      >
        <View>
          <CustomText fontFamily={FONTS.Medium} variant="h7">
            {title}
          </CustomText>
          <CustomText variant="h9" style={{ opacity: 0.7, marginTop: 3 }}>
            {description}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const theme = useCustomColorScheme();
  return (
    <CustomSafeAreaView style={{ paddingHorizontal: 0 }}>
      <ProfileHeader />

      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={[styles.flexRowBetween, { borderColor: colors.border }]}>
          <View style={styles.flexRow}>
            <UserAvatar style={styles.img} />
            <View>
              <CustomText fontFamily={FONTS.Medium} variant="h5">
                {user?.name}
              </CustomText>
              <CustomText variant="h9" style={{ opacity: 0.7, marginTop: 6 }}>
                Account Details
              </CustomText>
            </View>
          </View>
          <Icon
            name="chevron-right"
            size={RFValue(18)}
            style={{ opacity: 0.7 }}
            color={colors.text}
          />
        </View>

        <ProfileItem
          icon={
            <Icon2
              name="gift"
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title="Refer"
          description="Invite friends on Groww"
        />

        <ProfileItem
          icon={
            <Icon
              name="account-balance-wallet"
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title={`₹${user?.balance}`}
          description="Stocks, F&O Balance"
        />

        <ProfileItem
          icon={
            <Icon
              name="receipt"
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title="All Orders"
          description="Track orders, order details"
        />

        <ProfileItem
          icon={
            <Icon2
              name="bank"
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title="Bank detail"
          description="Banks & AutoPay mandates"
        />

        <ProfileItem
          onPress={async () => {
            await dispatch(
              toggleColorScheme(theme == "dark" ? "light" : "dark")
            );
          }}
          icon={
            <Icon
              name={theme == "dark" ? "light-mode" : "dark-mode"}
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title={theme == "dark" ? "Change Light" : "Change Dark"}
          description="Update your theme "
        />

        <ProfileItem
          onPress={async () => {
            await dispatch(Logout());
          }}
          icon={
            <Icon
              name="exit-to-app"
              size={RFValue(18)}
              style={{ opacity: 0.7, marginHorizontal: 20 }}
              color={colors.text}
            />
          }
          title="Logout"
          description="Logout from the app"
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  img: {
    width: RFValue(35),
    height: RFValue(35),
    marginRight: 10,
  },
});

export default ProfileScreen;
