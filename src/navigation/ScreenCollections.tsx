import EmailPasswordScreen from "../screens/auth/EmailPasswordScreen";
import EmailOtpScreen from "../screens/auth/EmailOtpScreen";
import PinScreen from "../screens/auth/PinScreen";
import AccountProtectedScreen from "../screens/auth/AccountProtectedScreen";
import PersonalDetailScreen from "../screens/auth/PersonalDetailScreen";
import ConfirmPinScreen from "../screens/auth/ConfirmPinScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import EmailScreen from "../screens/auth/EmailScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import PhoneScreen from "../screens/auth/PhoneScreen";
import ForgotPassword from "../screens/auth/ForgotPassword";
import AuthVerificationScreen from "../screens/auth/AuthVerificationScreen";
import SplashScreen from "../screens/deeplinks/SplashScreen";
import BottomTab from "./BottomTab";
import StockDetail from "../screens/stocks/StockDetail";
import TradingView from "../screens/stocks/TradingView";
import Transaction from "../screens/stocks/Transaction";
import TransactionSuccess from "../screens/stocks/TransactionSuccess";
import ProfileScreen from "../screens/auth/ProfileScreen";

export const authStacks = [
  {
    name: "LoginScreen",
    component: LoginScreen,
  },
  {
    name: "EmailScreen",
    component: EmailScreen,
  },
  {
    name: "EmailPasswordScreen",
    component: EmailPasswordScreen,
  },
  {
    name: "EmailOtpScreen",
    component: EmailOtpScreen,
  },
  {
    name: "PhoneScreen",
    component: PhoneScreen,
  },
  {
    name: "PinScreen",
    component: PinScreen,
  },
  {
    name: "ConfirmPinScreen",
    component: ConfirmPinScreen,
  },
  {
    name: "AccountProtectedScreen",
    component: AccountProtectedScreen,
  },
  {
    name: "PersonalDetailScreen",
    component: PersonalDetailScreen,
  },
  {
    name: "RegisterScreen",
    component: RegisterScreen,
  },
  {
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    name: "AuthVerificationScreen",
    component: AuthVerificationScreen,
  },
  {
    name: "SplashScreen",
    component: SplashScreen,
  },
  {
    name: "ProfileScreen",
    component: ProfileScreen,
  },
];

export const dashboardStack = [
  {
    name: "BottomTab",
    component: BottomTab,
  },
  {
    name: "StockDetail",
    component: StockDetail,
  },
  {
    name: "TradingView",
    component: TradingView,
  },
  {
    name: "Transaction",
    component: Transaction,
  },
  {
    name: "TransactionSuccess",
    component: TransactionSuccess,
  },
];

export const mergedStacks = [...dashboardStack, ...authStacks];
