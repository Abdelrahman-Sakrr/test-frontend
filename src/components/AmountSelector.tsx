import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import ArcDots from "./ArcDots";

interface AmountSelectorProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  currency?: string;
}

const SIZE = 220;


export const AmountSelector: React.FC<AmountSelectorProps> = ({
  min = 50,
  max = 5000,
  defaultValue = 50,
  currency = "$",
}) => {
  const amount = Math.min(Math.max(defaultValue, min), max);

  const raw = (amount - min) / (max - min);
  const progress = Math.min(Math.max(raw, 0), 1);

  return (
    <View style={styles.container}>
      {/* ── Arc ── */}
      <View style={styles.arcWrapper}>
        <ArcDots progress={progress} />

        {/* Center label */}
        <View style={styles.labelOverlay}>
          <Text style={styles.amountText}>
            {currency}{amount.toLocaleString()}
          </Text>
          <Text style={styles.maxLabel}>
            Max {currency}{max.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Text style={styles.boundLabel}>
          {currency}{min}
        </Text>

        <Text style={styles.boundLabel}>
          {currency}{max.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  arcWrapper: {
    width: SIZE,
    height: SIZE,
  },
  dot: {
    position: "absolute",
  },
  labelOverlay: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  amountText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A2E",
    letterSpacing: -1,
  },
  maxLabel: {
    fontSize: 12,
    color: "#7357F5",
    fontWeight: "500",
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    marginTop: 4,
  },
  boundLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    minWidth: 44,
  },
  stepperRow: {
    flexDirection: "row",
    gap: 12,
  },
  stepper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F3F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperText: {
    fontSize: 22,
    color: "#1A1A2E",
    fontWeight: "500",
    lineHeight: 26,
  },
});