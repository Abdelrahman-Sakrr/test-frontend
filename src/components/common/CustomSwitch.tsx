import { Colors } from "@/constants/colors";
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface CryptoToggleProps {
  label?: string;
  description?: string;
  value?: boolean;
  onValueChange?: (val: boolean) => void;
}

export const CustomSwitch: React.FC<CryptoToggleProps> = ({
  label = "Do you own crypto?",
  description = "Increase your limit up to $10,000",
  value,
  onValueChange,
}) => {
  const [internalValue, setInternalValue] = useState(false);
  const isControlled = value !== undefined;
  const toggleValue = isControlled ? value : internalValue;

  const handleChange = (val: boolean) => {
    if (!isControlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>ℹ️</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={toggleValue}
        onValueChange={handleChange}
        trackColor={{ false: Colors.grey_200, true: "#7357F5" }}
        thumbColor={Colors.white}
        ios_backgroundColor={Colors.grey_200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grey_50,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 10,
  },
  iconWrapper: {
    width: 24,
    alignItems: "center",
  },
  icon: {
    fontSize: 15,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.dark,
  },
  description: {
    fontSize: 11,
    color: Colors.grey_600,
    marginTop: 2,
  },
});