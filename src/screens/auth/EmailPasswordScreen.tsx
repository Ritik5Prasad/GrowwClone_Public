import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomInput from "../../components/inputs/CustomInput";
import CustomButton from "../../components/global/CustomButton";
import { validatePasswordLength } from "../../utils/ValidationUtils";
import { goBack, navigate, resetAndNavigate } from "../../utils/NavigationUtil";
import { GlobalStyles } from "../../styles/GlobalStyles";
import TouchableText from "../../components/auth/TouchableText";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppDispatch } from "../../redux/reduxHook";
import { EmailLogin } from "../../redux/actions/userAction";

const EmailPasswordScreen = ({ route }: any) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const validate = () => {
    if (!validatePasswordLength(password)) {
      setPasswordError("Please enter a valid password");
      return false;
    }
    return true;
  };

  const handleOnSubmit = async () => {
    setLoading(true);

    if (validate()) {
      await dispatch(
        EmailLogin({ email: route.params.email, password: password })
      );
    }
    setLoading(false);
  };

  return (
    <CustomSafeAreaView>
      <ScrollView>
        <CenteredLogo />

        <TouchableOpacity onPress={() => goBack()}>
          <View pointerEvents="none">
            <CustomInput label="EMAIL ADDRESS" value={route.params.email} />
          </View>
        </TouchableOpacity>

        <CustomInput
          label="ENTER PASSWORD"
          returnKeyType="done"
          placeholder="8-20 Characters"
          value={password}
          autoFocus={true}
          error={passwordError}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
          onSubmitEditing={handleOnSubmit}
          password
        />
        <TouchableText
          onPress={() =>
            navigate("ForgotPassword", {
              email: route.params.email,
            })
          }
          firstText="Forgot Password?"
          style={styles.forgotText}
        />
      </ScrollView>
      <View style={GlobalStyles.bottomBtn}>
        <CustomButton
          text="ENTER"
          loading={loading}
          disabled={loading}
          onPress={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    fontSize: RFValue(10),
    marginTop: 5,
    alignSelf: "flex-end",
  },
});

export default EmailPasswordScreen;
