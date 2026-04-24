import { Colors } from "@/constants/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BannerProps {
  message?: string;
  ctaLabel?: string;
  onPress?: () => void;
}

export const Banner: React.FC<BannerProps> = ({
  message = "Check out our partner offerings, handpicked to help you save.",
  ctaLabel = "Check out",
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.icon}>🎁</Text>
        <Text style={styles.message}>
          <Text style={styles.bold}>New offers!</Text>{" "}
          {message}
        </Text>
      </View>
      <View style={styles.ctaContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.cta}>{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    gap: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    flexWrap: "wrap",
  },
  icon: {
    fontSize: 28,
  },
  message: {
    flex: 1,
    fontSize: 13,
    color: Colors.grey_900,
    lineHeight: 18,
  },
  messageContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bold: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
  },
  ctaContainer: {
    width: "100%",
    alignSelf: "flex-end",
    marginBottom: 4,
  },
  cta: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.green,
    textDecorationLine: "underline",
    textAlign: "right",
  },
});