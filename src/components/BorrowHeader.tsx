import { Colors } from "@/constants/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BorrowHeaderProps {
  title?: string;
  onMenuPress?: () => void;
  onGiftPress?: () => void;
}

export const BorrowHeader: React.FC<BorrowHeaderProps> = ({
  title = "BORROW",
  onMenuPress,
  onGiftPress,
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
          <View style={styles.menuIcon}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.menuBar, i === 2 && styles.menuBarShort]} />
            ))}
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onGiftPress} style={styles.iconBtn}>
          <Image source={require("@/assets/images/gift.png")} style={styles.giftIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.primary,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    gap: 4,
  },
  menuBar: {
    width: 22,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 2,
    marginVertical: 2,
  },
  menuBarShort: {
    width: 14,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  giftIcon: {
    width: 40,
    height: 40,
  },
  inner: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }
});