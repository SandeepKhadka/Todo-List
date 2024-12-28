import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
const Todo = () => {
  const [loaded, error]= useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.upperContainer}></ThemedView>
      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.topText}>
          <ThemedText style={styles.greet}>Good Afternoon</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  upperContainer: {
    flex: 0.3,
    backgroundColor: "#50C2C9",
  },
  bottomContainer: { flex: 1 },
  topText: {
    flex: 0.4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  greet: {
    fontFamily: "Poppins SemiBold",
    fontSize: 20,
  },
});
