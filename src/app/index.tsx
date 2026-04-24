import { Redirect } from "expo-router";

export default function Index() {
  // Redirect root "/" to the login screen inside the (auth) group.
  // Swap for an auth-state check once you have a real session:
  //   const { session } = useAuth();
  //   return session
  //     ? <Redirect href="/(main)/borrow" />
  //     : <Redirect href="/(auth)/login" />;
  return <Redirect href="/(auth)/login" />;
}