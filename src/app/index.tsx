import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return token
    ? <Redirect href="/(main)/borrow" />
    : <Redirect href="/(auth)/login" />;
}