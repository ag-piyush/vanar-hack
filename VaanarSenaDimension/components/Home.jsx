import { StyleSheet, View, Text } from "react-native";

export default Home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to VaanarSena :D</Text>
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
