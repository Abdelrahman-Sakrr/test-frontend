
import React, { useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";

import Animated, {
  useSharedValue,
  withSpring,
} from "react-native-reanimated";


import { Colors } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export type NavTab =
  | "test"
  | "borrow"
  | "card"
  | "profile";

type Props = {
  activeTab: NavTab;
  onTabPress: (tab: NavTab) => void;
};

type TabConfig = {
  key: NavTab;
  icon: {
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
  };
};

const tabs: TabConfig[] = [
  {
    key: "borrow",
    icon: {
      active: require("@/assets/images/tabIcons/home.png"),
      inactive: require("@/assets/images/tabIcons/home.png"),
    },
  },
  {
    key: "test",
    icon: {
      active: require("@/assets/images/tabIcons/money-bag.png"),
      inactive: require("@/assets/images/tabIcons/money-bag.png"),
    },
  },
  {
    key: "card",
    icon: {
      active: require("@/assets/images/tabIcons/menu.png"),
      inactive: require("@/assets/images/tabIcons/menu.png"),
    },
  },
  {
    key: "profile",
    icon: {
      active: require("@/assets/images/tabIcons/bell.png"),
      inactive: require("@/assets/images/tabIcons/bell.png"),
    },
  },
];

export function BottomNavBar({
  activeTab,
  onTabPress,
}: Props) {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom: bottom, backgroundColor: Colors.white, // 👈 fix the gap
        },

      ]}
    >
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab.key}
            icon={tab.icon}
            isActive={activeTab === tab.key}
            onPress={onTabPress}
          />
        ))}
      </View>
    </View>
  );
}

type TabItemProps = {
  tab: NavTab;
  icon: {
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
  };
  isActive: boolean;
  onPress: (tab: NavTab) => void;
};

function TabItem({
  tab,
  icon,
  isActive,
  onPress,
}: TabItemProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const bubbleScale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      isActive ? 1.2 : 1,
      { damping: 12 }
    );

    translateY.value = withSpring(
      isActive ? -6 : 0
    );

    bubbleScale.value = withSpring(
      isActive ? 1 : 0
    );
  }, [isActive]);



  return (
    <Pressable
      style={styles.tab}
      onPress={() => onPress(tab)}
    >
      <Animated.View
        style={[
          styles.bubble,
        ]}
      />

      <Animated.Image
        source={isActive ? icon?.active : icon?.inactive}
        style={[styles.icon]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    width: width,
    height: 70,

    backgroundColor: Colors.white,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bubble: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});