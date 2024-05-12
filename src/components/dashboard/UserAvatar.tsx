import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useAppSelector } from "../../redux/reduxHook";
import { selectUser } from "../../redux/reducers/userSlice";
import CustomText from "../global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { userPic } from "../../utils/staticData";
import { navigate } from "../../utils/NavigationUtil";

interface UserAvatarProps {
  style?: ImageStyle;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ style }) => {
  const user = useAppSelector(selectUser);
  return (
    <TouchableOpacity
      onPress={() => {
        navigate("ProfileScreen");
      }}
    >
      {userPic.pic ? (
        <Image
          source={{
            uri: userPic.pic,
          }}
          style={[styles.img, style]}
        />
      ) : (
        <View style={[styles.img, style]}>
          <CustomText variant="h8" fontFamily={FONTS.Bold}>
            {user?.name?.split(" ")[0].charAt(0)}
            {user?.name?.split(" ")[1].charAt(0)}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 80,
    justifyContent: "center",
    width: RFValue(25),
    height: RFValue(25),
    alignItems: "center",
    resizeMode: "cover",
    marginLeft: 6,
    backgroundColor: Colors.themeColor,
  },
});

export default UserAvatar;
