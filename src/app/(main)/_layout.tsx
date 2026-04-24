import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";

import { Colors } from "@/constants/colors";
import { BottomNavBar } from "@/components/BottomTabBar";

type NavTab = "test" | "borrow" | "profile" | "card";

function getActiveTab(pathname: string): NavTab {
  if (pathname.includes("borrow")) return "borrow";
  if (pathname.includes("profile")) return "profile";
  if (pathname.includes("card")) return "card";

  return "borrow";
}

export default function MainLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = useMemo(
    () => getActiveTab(pathname),
    [pathname]
  );

  function handleTabPress(tab: NavTab) {
    switch (tab) {
      case "test":
        router.replace("/borrow");
        break;

      case "borrow":
        router.replace("/borrow");
        break;

      case "profile":
        router.replace("/borrow");
        break;

      case "card":
        router.replace("/borrow");
        break;
    }
  }

  return (
    <>
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>

      <BottomNavBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_50,
  },
  content: {
    flex: 1,
  },
});