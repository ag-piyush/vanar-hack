import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function Root() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
