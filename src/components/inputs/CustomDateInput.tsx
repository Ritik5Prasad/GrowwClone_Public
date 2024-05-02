import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  TextStyle,
  useColorScheme,
} from "react-native";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  disabledBackground?: boolean;
  required?: boolean;
  textInputStyle?: TextStyle;
  onFocus?: () => void;
  onDateChange?: (date: string) => void;
}

const CustomDateInput: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({
  label,
  error,
  disabled,
  disabledBackground,
  required,
  textInputStyle,
  onFocus = () => {},
  onDateChange = () => {},
  ...props
}) => {
  const { colors } = useTheme();
  const [isDayFocused, setIsDayFocused] = useState(false);
  const [isMonthFocused, setIsMonthFocused] = useState(false);
  const [isYearFocused, setIsYearFocused] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const theme = useColorScheme();

  const monthInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  const handleDayChange = (text: string) => {
    setIsDayFocused(true);
    // Format day input to have leading zero if needed
    let formattedDay = text.replace(/\D/g, "").substring(0, 2); // Remove non-numeric characters and limit to 2 digits
    setDay(formattedDay);
    if (formattedDay.length === 2) {
      // Move focus to month input when day input is complete
      setIsDayFocused(false);
      setIsMonthFocused(true);
      monthInputRef.current?.focus();
    }
    updateDate(formattedDay, month, year);
  };

  const handleMonthChange = (text: string) => {
    setIsMonthFocused(true);
    // Format month input to have leading zero if needed
    let formattedMonth = text.replace(/\D/g, "").substring(0, 2); // Remove non-numeric characters and limit to 2 digits
    setMonth(formattedMonth);
    if (formattedMonth.length === 2) {
      // Move focus to year input when month input is complete
      setIsMonthFocused(false);
      setIsYearFocused(true);
      yearInputRef.current?.focus();
    }
    updateDate(day, formattedMonth, year);
  };

  const handleYearChange = (text: string) => {
    setIsYearFocused(true);
    // Format year input to have leading zeros if needed
    let formattedYear = text.replace(/\D/g, "").substring(0, 4); // Remove non-numeric characters and limit to 4 digits
    setYear(formattedYear);
    if (formattedYear.length === 4) {
      // When year input is complete, blur the input and update the date
      setIsYearFocused(false);
      yearInputRef.current?.blur();
      updateDate(day, month, formattedYear);
    }
  };

  const updateDate = (dd: string, mm: string, yyyy: string) => {
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    onDateChange(formattedDate);
  };

  const handleDateChange = (selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      const dateParts = formattedDate.split("/");
      if (dateParts.length === 3) {
        setDay(dateParts[0].padStart(2, "0"));
        setMonth(dateParts[1].padStart(2, "0"));
        setYear(dateParts[2].padStart(4, "0"));
        updateDate(dateParts[0], dateParts[1], dateParts[2]);
      }
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.inputMainContainer}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.label,
              { color: colors.text, opacity: theme == "dark" ? 1 : 0.4 },
            ]}
          >
            {label} {required && "*"}
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TextInput
            placeholderTextColor={theme == "dark" ? "#dadbde" : "#cfd0d3"}
            style={[
              styles.textInput,
              {
                ...textInputStyle,
                color: colors.text,
                borderColor: error
                  ? Colors.errorColor
                  : isDayFocused
                  ? Colors.profit
                  : Colors.dark_border,
                borderBottomWidth: isDayFocused ? 2 : 1,
                width: 30,
              },
            ]}
            placeholder="DD"
            maxLength={2}
            autoCorrect={false}
            keyboardType="numeric"
            onFocus={() => {
              onFocus();
              setIsDayFocused(true);
            }}
            onChangeText={handleDayChange}
            onBlur={() => {
              setIsDayFocused(false);
            }}
            editable={!disabled}
            value={day}
            {...props}
          />
          <CustomText variant="h4" style={{ color: Colors.dark_border }}>
            /
          </CustomText>
          <TextInput
            ref={monthInputRef}
            placeholderTextColor={theme == "dark" ? "#dadbde" : "#cfd0d3"}
            style={[
              styles.textInput,
              {
                ...textInputStyle,
                color: colors.text,
                borderColor: error
                  ? Colors.errorColor
                  : isMonthFocused
                  ? Colors.profit
                  : Colors.dark_border,
                borderBottomWidth: isMonthFocused ? 2 : 1,
                width: 30,
              },
            ]}
            placeholder="MM"
            maxLength={2}
            autoCorrect={false}
            keyboardType="numeric"
            onFocus={() => {
              onFocus();
              setIsMonthFocused(true);
            }}
            onChangeText={handleMonthChange}
            onBlur={() => {
              setIsMonthFocused(false);
            }}
            editable={!disabled}
            value={month}
            {...props}
          />
          <CustomText variant="h4" style={{ color: Colors.dark_border }}>
            /
          </CustomText>
          <TextInput
            ref={yearInputRef}
            placeholderTextColor={theme == "dark" ? "#dadbde" : "#cfd0d3"}
            style={[
              styles.textInput,
              {
                ...textInputStyle,
                color: colors.text,
                borderColor: error
                  ? Colors.errorColor
                  : isYearFocused
                  ? Colors.profit
                  : Colors.dark_border,
                borderBottomWidth: isYearFocused ? 2 : 1,
                width: 50,
              },
            ]}
            placeholder="YYYY"
            maxLength={4}
            autoCorrect={false}
            keyboardType="numeric"
            onFocus={() => {
              onFocus();
              setIsYearFocused(true);
            }}
            onChangeText={handleYearChange}
            onBlur={() => {
              setIsYearFocused(false);
            }}
            editable={!disabled}
            value={year}
            {...props}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.iconContainer}
        >
          <Icon
            size={RFValue(18)}
            name="calendar-today"
            color={colors.primary}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={()=>setShowDatePicker(false)}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Icon2
            size={RFValue(13)}
            name="information-circle"
            style={styles.errorText}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomDateInput;

const styles = StyleSheet.create({
  inputMainContainer: {
    marginVertical: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 5,
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(11),
    fontFamily: FONTS.Medium,
  },
  label: {
    fontSize: Platform.OS === "ios" ? RFValue(9) : RFValue(9),
    fontFamily: FONTS.Regular,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textInput: {
    fontFamily: FONTS.Regular,
    fontSize: Platform.OS === "ios" ? RFValue(12) : RFValue(13),
    alignItems: "flex-start",
    height: 28,
    paddingVertical: 5,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
