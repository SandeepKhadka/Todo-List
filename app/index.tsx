import { StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFonts } from "expo-font";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
const Todo = () => {
  const theme = useColorScheme();
  const backgroundColor = theme === "light" ? "#50C2C9" : "white";
  const [openTaskForm, setTaskForm] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins SemiBold.ttf"),
  });
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 0.4,
          backgroundColor: theme === "light" ? "#50C2C9" : "#1A5A5E",
        }}
      ></ThemedView>
      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.topText}>
          {/* <ThemedText style={styles.greet}>Good Afternoon</ThemedText> */}
        </ThemedView>
        <ThemedView style={styles.task}>
          {openTaskForm && (
            <TaskForm
              updatedValue={updatedValue}
              setUpdatedValue={setUpdatedValue}
              onPress={() => {
                setUpdatedValue("");
                setTaskForm(false);
              }}
            />
            // <TaskModal
            //   onPress={() => {
            //     setTaskForm(false);
            //   }}
            // />
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
          <TaskCard
            openTaskForm={openTaskForm}
            setTaskForm={setTaskForm}
            setUpdatedValue={setUpdatedValue}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  upperContainer: {},
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
