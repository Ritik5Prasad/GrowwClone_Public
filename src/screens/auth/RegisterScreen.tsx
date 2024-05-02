import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomInput from "../../components/inputs/CustomInput";
import CustomButton from "../../components/global/CustomButton";
import { validatePasswordLength } from "../../utils/ValidationUtils";
import { goBack, resetAndNavigate } from "../../utils/NavigationUtil";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";
import GuidelineText from "../../components/global/GuidelineText";
import { useAppDispatch } from "../../redux/reduxHook";
import { Register } from "../../redux/actions/userAction";

const RegisterScreen = ({ route }: any) => {
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
      dispatch(
        Register({
          email: route.params.email,
          password: password,
          register_token: route.params.register_token,
        })
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
          label="SET PASSWORD"
          returnKeyType="done"
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
      </ScrollView>
      <View style={GlobalStyles.bottomBtn}>
        <GuidelineText
          text={[
            "Password must have at least one uppercase and lowercase letter.",
            "Must contain atleast one number and one special character",
            "Must not contain user's first/last name & email id",
          ]}
        />
        <CustomButton
          text="NEXT"
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

export default RegisterScreen;
