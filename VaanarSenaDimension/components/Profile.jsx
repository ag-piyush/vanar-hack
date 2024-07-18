import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { SECURE_TOKEN_KEY } from "../constants/Constants";

const Profile = () => {
  const nav = useNavigation();
  function signOut() {
    // Delete token from storage
    SecureStore.deleteItemAsync(SECURE_TOKEN_KEY);
    // AXIOS delete default header
    axios.defaults.headers.common["Authorization"] = ``;
    nav.navigate("Login"); // Navigate to HomeTabs
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to VaanarSena :D</Text>
      <Button title="SIGN OUT" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
