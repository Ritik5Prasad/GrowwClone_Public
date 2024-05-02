import React, { FC, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import BackButton from "../../components/global/BackButton";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomInput from "../../components/inputs/CustomInput";
import { View } from "react-native"; // Added Alert for showing error message
import CustomButton from "../../components/global/CustomButton";
import { navigate } from "../../utils/NavigationUtil";
import { ScrollView } from "react-native";
import { validateEmail } from "../../utils/ValidationUtils";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useAppDispatch } from "../../redux/reduxHook";
import { CheckEmail } from "../../redux/actions/userAction";

const EmailScreen: FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useAppDispatch();
  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleOnSubmit = async () => {
    setLoading(true);
    if (validate()) {
      await dispatch(CheckEmail({ email: email.toLowerCase() }));
    }
    setLoading(false);
  };

  return (
    <CustomSafeAreaView>
      <BackButton path="LoginScreen" />
      <ScrollView>
        <CenteredLogo />
        <CustomInput
          label="EMAIL ADDRESS"
          returnKeyType="done"
          value={email}
          inputMode="email"
          focusable={true}
          autoFocus={true}
          error={emailError}
          onEndEditing={() => validate()}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
          placeholder="Eg: me@gmail.com"
          onSubmitEditing={handleOnSubmit}
        />
      </ScrollView>
      <View style={GlobalStyles.bottomBtn}>
        <CustomButton
          text="NEXT"
          loading={loading}
          disabled={!validateEmail(email) || loading}
          onPress={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default EmailScreen;
