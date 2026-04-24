import { Colors } from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AvailableCreditCardProps {
  credit?: number;
  currency?: string;
  earnLabel?: string;
  onEarnPress?: () => void;
  onCardPress?: () => void;
}

export const AvailableCreditCard: React.FC<AvailableCreditCardProps> = ({
  credit = 0,
  currency = "$",
  earnLabel = "Earn Now",
  onEarnPress,
  onCardPress,
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Credit Header Row */}
      <TouchableOpacity style={styles.headerRow} onPress={onCardPress}>
        <View style={styles.logoCircle}>
          <Image source={require("@/assets/images/gold.png")} />
        </View>
        <View style={styles.creditInfo}>
          <Text style={styles.creditLabel}>Your Available Credit</Text>
          <Text style={styles.creditAmount}>
            {currency}
            {credit.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      {/* Earn Banner */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        style={styles.earnBanner}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/play.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.earnTextBlock}>
          <Text style={styles.earnDescription}>
            Play game and earn credit{"\n"}to use as Lenme Cash
          </Text>
          <TouchableOpacity style={styles.earnBtn} onPress={onEarnPress}>
            <Text style={styles.earnBtnText}>{earnLabel}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  creditInfo: {
    flex: 1,
  },
  creditLabel: {
    fontSize: 12,
    color: Colors.grey_600,
  },
  creditAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark,
    marginTop: 1,
  },
  chevron: {
    fontSize: 22,
    color: Colors.grey_400,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginRight: 20,
    width: "100%",
    height: 90,
  },
  earnBanner: {
    margin: 10,
    borderRadius: 12,
    padding: 16,
    paddingRight: 12,
  },
  earnTextBlock: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  earnDescription: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
  earnBtn: {
    backgroundColor: Colors.yellow,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  earnBtnText: {
    color: Colors.dark,
    fontSize: 13,
    fontWeight: "700",
  },
  illustrationPlaceholder: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationEmoji: {
    fontSize: 52,
  },
});