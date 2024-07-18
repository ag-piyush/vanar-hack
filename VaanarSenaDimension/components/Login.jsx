import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { API_URL, SECURE_TOKEN_KEY } from "../constants/Constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const login = async (email, password) => {
  try {
    const result = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log("[LOGIN]", result.data);

    axios.defaults.headers.common["Authorization"] = `${result.data.token}`;
    await SecureStore.setItemAsync(SECURE_TOKEN_KEY, result.data.token);
  } catch (err) {
    console.log(err);
  }
};

export default function LoginPage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigation.navigate("Home"); // Navigate to HomeTabs
  };

  const handleRegister = async () => {
    setLoading(true);
    await axios.post(`${API_URL}/auth/signup`, { email, password });

    setLoading(false);
    if (res && res.error) {
      Alert.alert(res.msg);
    } else {
      handleLogin();
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, gap: 20, marginTop: 100, alignItems: "center" }}>
      <TextInput
        style={{ width: 200, padding: 8, borderColor: "black", borderRadius: 8, borderWidth: 2 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{ width: 200, padding: 8, borderColor: "black", borderRadius: 8, borderWidth: 2 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: 120,
    borderRadius: 4,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
