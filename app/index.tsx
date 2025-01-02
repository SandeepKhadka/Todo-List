import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
const Todo = () => {
  const [openTaskForm, setTaskForm] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.upperContainer}></ThemedView>
      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.topText}>
          {/* <ThemedText style={styles.greet}>Good Afternoon</ThemedText> */}
        </ThemedView>
        <ThemedView style={styles.task}>
          {openTaskForm && (
            <TaskModal
              onPress={() => {
                setTaskForm(false);
              }}
            />
          )}
          <ThemedText
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            Task list
          </ThemedText>
          <TaskCard openTaskForm={openTaskForm} setTaskForm={setTaskForm} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  upperContainer: {
    flex: 0.4,
    backgroundColor: "#50C2C9",
  },
  bottomContainer: { flex: 1, marginRight: 20, marginLeft: 20 },
  topText: {},
  greet: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    marginTop: 15,
  },
  task: {
    marginTop: 10,
    flex: 0.95,
  },
});
