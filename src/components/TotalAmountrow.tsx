import { Colors } from "@/constants/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TotalAmountRowProps {
  amount: number;
  fees: number;
  currency?: string;
  onProceed?: () => void;
}

export const TotalAmountRow: React.FC<TotalAmountRowProps> = ({
  amount,
  fees,
  currency = "$",
  onProceed,
}) => {
  const total = (amount + fees).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.label}>Total amount</Text>
        <Text style={styles.sub}>
          with applicable{" "}
          <Text style={styles.feeLink}>fees</Text>{" "}
          <Text style={styles.feeAmount}>{currency}{(fees).toFixed(2)}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={onProceed} style={styles.arrowBtn}>
        <Text style={styles.arrowIcon}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  textBlock: {
    gap: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark,
  },
  sub: {
    fontSize: 12,
    color: Colors.grey_600,
  },
  feeLink: {
    color: "#7357F5",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  feeAmount: {
    color: Colors.grey_700,
    fontWeight: "500",
  },
  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});