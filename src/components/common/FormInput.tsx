import { Colors } from "@/constants/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  handleFocus?: () => void;
  handleBlur?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  isPassword = false,
  containerStyle,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          !!error && styles.inputRowError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.grey_400}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          {...inputProps}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            style={styles.eyeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={Colors.grey_400}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grey_0,
    borderWidth: 1.5,
    borderColor: Colors.grey_100,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  inputRowError: {
    borderColor: Colors.error,
    backgroundColor: "#fff8f8",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark,
    fontWeight: "400",
  },
  eyeBtn: {
    paddingLeft: 8,
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: "500",
  },
});