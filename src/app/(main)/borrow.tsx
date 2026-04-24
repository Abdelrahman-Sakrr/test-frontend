import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Colors } from "@/constants/colors";
import { BorrowHeader } from "@/components/BorrowHeader";
import { CustomSwitch } from "@/components/common/CustomSwitch";
import { AmountSelector } from "@/components/AmountSelector";
import { TotalAmountRow } from "@/components/TotalAmountrow";
import { Banner } from "@/components/common/Banner";
import { AvailableCreditCard } from "@/components/AvailableCreditCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FEE_RATE = 0.062;
const amount = 950;

export default function BorrowScreen() {
  const { bottom, top } = useSafeAreaInsets();
  const [cryptoEnabled, setCryptoEnabled] = useState(false);

  const fees = parseFloat((amount * FEE_RATE).toFixed(2));
  const maxAmount = cryptoEnabled ? 10000 : 5000;

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Main Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: top + 110,
            paddingBottom: bottom + 10,
          },
        ]}
      >
        <BorrowHeader
          onMenuPress={() => console.log("Menu pressed")}
          onGiftPress={() => console.log("Gift pressed")}
        />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How much would you like to borrow?</Text>

          <CustomSwitch
            value={cryptoEnabled}
            onValueChange={setCryptoEnabled}
          />

          <AmountSelector
            min={50}
            max={maxAmount}
            defaultValue={amount}
            
          />

          <TotalAmountRow
            amount={amount}
            fees={fees}
            onProceed={() => console.log("Proceed with", amount)}
          />
        </View>

        <Banner onPress={() => console.log("Check out offers")} />

        <AvailableCreditCard
          credit={3.09}
          onEarnPress={() => console.log("Earn Now")}
          onCardPress={() => console.log("View Credit")}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.grey_50,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 14,
  },
});