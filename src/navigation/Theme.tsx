import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { useAppSelector } from "../redux/reduxHook";
import { selectTheme } from "../redux/reducers/themeSlice";
import { ColorSchemeName } from "react-native";

interface ThemeColors {
  background: string;
  border: string;
  card: string;
  notification: string;
  text: string;
  primary: string;
}

interface Theme {
  dark: boolean;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: Colors.light_background,
    border: Colors.light_border,
    card: Colors.light_card,
    notification: Colors.noti_card_light,
    primary: Colors.themeColor,
    text: Colors.light_text,
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: Colors.dark_background,
    border: Colors.dark_border,
    card: Colors.dark_card,
    notification: Colors.noti_card_dark,
    primary: Colors.themeColor,
    text: Colors.dark_text,
  },
};

export const useCustomTheme = (): Theme => {
  const currentTheme = useAppSelector(selectTheme);
  const scheme = useColorScheme();
  if (currentTheme) {
    //according to user preference
    return currentTheme === "dark" ? darkTheme : lightTheme;
  } else {
    //according to os preference
    return scheme === "dark" ? darkTheme : lightTheme;
  }
};

export const useCustomColorScheme = (): ColorSchemeName => {
  const currentTheme = useAppSelector(selectTheme);
  const scheme = useColorScheme();
  if (currentTheme) {
    //return current user theme mode
    return currentTheme == "dark" ? "dark" : "light";
  } else {
    //return os user theme mode
    return scheme;
  }
};
