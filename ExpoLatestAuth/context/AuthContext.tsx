import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "./AuthContextProps";
import { registerForPushNotificationsAsync } from "./NotificationSetup";
import * as Notifications from "expo-notifications";
import { API_URL, SECURE_TOKEN_KEY } from "@/constants/Constants";

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });
  const [expoPushToken, setExpoPushToken] = useState("");

  // Expo notification init
  const responseListener = useRef<Notifications.Subscription>();
  const notificationListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(() => {});
    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Initial check if token exists
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(SECURE_TOKEN_KEY);
      console.log("[TOKEN STORED] ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      } else {
        setAuthState({
          token: null,
          authenticated: false,
        });
      }
    };
    loadToken();
  }, []);

  // LOGIN - and save the latest token
  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, { email, password, expoPushToken });
      console.log("[LOGIN]", result.data);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // AXIOS DEFAULT HTTP headers
      axios.defaults.headers.common["Authorization"] = `${result.data.token}`;
      // SAVE IN SECURE STORE FROM EXPO
      await SecureStore.setItemAsync(SECURE_TOKEN_KEY, result.data.token);

      return result;
    } catch (err) {
      return { error: true, msg: (err as any).response.data.msg };
    }
  };

  // REGISTER
  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/auth/signup`, { email, password, expoPushToken });
    } catch (err) {
      return { error: true, msg: (err as any).response.data.msg };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      // Call to server to remove Expo token
      await axios.post(`${API_URL}/auth/logout`, { expoPushToken });
      // Delete token from storage
      await SecureStore.deleteItemAsync(SECURE_TOKEN_KEY);
      // AXIOS delete default header
      axios.defaults.headers.common["Authorization"] = ``;

      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (err) {
      console.error(err);
      return { error: true, msg: (err as any).response.data.msg };
    }
  };

  const value = {
    authState,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    expoPushToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
